import { app } from '@/lib/firebase';
import { newsBlog } from '@/type/threehighplus/postnews';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  getDoc,
  getFirestore,
  getDocs,
  query,
  where,
  QueryDocumentSnapshot,
  DocumentData,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { uploadFile, uploadFiles, deleteFile, deleteFiles } from '@/lib/blob';
import { validateFile } from '@/lib/validations';

const db = getFirestore(app);
const postNewsCollection = collection(db, "threehighplus/blogNews/PostNews");

// =====================
// INTERFACE DEFINITIONS
// =====================

interface PaginationOptions {
  pageSize?: number;
  lastVisible?: QueryDocumentSnapshot<DocumentData> | null;
  statusFilter?: 'publish' | 'draft' | 'all';
  categoryId?: string;
}

interface PaginatedResult {
  data: newsBlog[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}

interface CreatePostParams {
  postData: Omit<newsBlog, 'id' | 'createdAt' | 'updatedAt'>;
  coverImage: File | null;
  contentImages?: File[];
}

interface UpdatePostParams {
  id: string;
  postData: Partial<Omit<newsBlog, 'id' | 'createdAt'>>;
  newCoverImage?: File | null;
  contentImagesToRemove?: string[];
  newContentImages?: File[];
}

interface OperationResult<T = newsBlog> {
  success: boolean;
  error?: string;
  data?: T;
  status?: number;
}

// =================
// UTILITY FUNCTIONS
// =================

const handleFirestoreError = (error: unknown): OperationResult => {
  console.error("Firestore error:", error);
  return {
    success: false,
    error: error instanceof Error ? error.message : "Database operation failed",
    status: 500
  };
};

const validatePostData = (postData: Partial<newsBlog>): OperationResult | null => {
  if (!postData.title) {
    return { success: false, error: "Title is required", status: 400 };
  }
  if (!postData.content) {
    return { success: false, error: "Content is required", status: 400 };
  }
  if (postData.title.length > 100) {
    return { success: false, error: "Title must be less than 100 characters", status: 400 };
  }
  return null;
};

// ==============
// CRUD OPERATIONS
// ==============

export const createBlogPost = async ({
  postData,
  coverImage,
  contentImages = []
}: CreatePostParams): Promise<OperationResult> => {
  try {
    // Validate post data
    const validationError = validatePostData(postData);
    if (validationError) return validationError;

    // Handle cover image
    let coverImageUrl: string | null = null;
    if (coverImage) {
      const validation = await validateFile(coverImage, {
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
        maxSize: 5 * 1024 * 1024 // 5MB
      });
      
      if (!validation.valid) {
        return { success: false, error: `Cover image: ${validation.error}`, status: 400 };
      }

      const { url } = await uploadFile(coverImage, 'post_covers');
      coverImageUrl = url;
    }

    // Handle content images
    let contentImageUrls: string[] = [];
    if (contentImages.length > 0) {
      for (const img of contentImages) {
        const validation = await validateFile(img);
        if (!validation.valid) {
          // Cleanup uploaded files if validation fails
          if (contentImageUrls.length > 0) await deleteFiles(contentImageUrls);
          if (coverImageUrl) await deleteFile(coverImageUrl);
          return { success: false, error: `Content image: ${validation.error}`, status: 400 };
        }
      }

      const results = await uploadFiles(contentImages, 'content_images');
      contentImageUrls = results.map(r => r.url);
    }

    // Create document
    const newPost = {
      ...postData,
      coverImageUrl,
      contentImage: contentImageUrls.length === 1 ? contentImageUrls[0] : contentImageUrls,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      published: postData.status === 'publish'
    };

    const docRef = await addDoc(postNewsCollection, newPost);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      // Cleanup if document creation failed
      const filesToDelete = [
        ...(coverImageUrl ? [coverImageUrl] : []),
        ...contentImageUrls
      ];
      if (filesToDelete.length > 0) await deleteFiles(filesToDelete);
      return { success: false, error: "Failed to create blog post", status: 500 };
    }

    return {
      success: true,
      data: { id: docRef.id, ...docSnap.data() as newsBlog },
      status: 201
    };
  } catch (error) {
    return handleFirestoreError(error);
  }
};

export const getBlogNews = async (
  options: PaginationOptions = {}
): Promise<OperationResult<newsBlog[]> & PaginatedResult> => {
  try {
    const {
      pageSize = 10,
      lastVisible = null,
      statusFilter = 'publish',
      categoryId
    } = options;

    // Base query
    let q = query(
      postNewsCollection,
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    );

    // Apply filters
    if (statusFilter !== 'all') {
      q = query(q, where('published', '==', statusFilter === 'publish'));
    }

    if (categoryId) {
      q = query(q, where('categories', 'array-contains', categoryId));
    }

    // Apply pagination
    if (lastVisible) {
      q = query(q, startAfter(lastVisible));
    }

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as newsBlog
    }));

    return {
      success: true,
      data,
      lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1] || null,
      hasMore: data.length === pageSize,
      status: 200
    };
  } catch (error) {
    return {
      ...handleFirestoreError(error),
      data: [],
      lastVisible: null,
      hasMore: false
    };
  }
};

export const getBlogPostById = async (id: string): Promise<OperationResult> => {
  try {
    const docRef = doc(db, "threehighplus/blogNews/PostNews", id);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      return { success: false, error: "Blog post not found", status: 404 };
    }

    const postData = docSnapshot.data() as newsBlog;
    
    return {
      success: true,
      data: { id: docSnapshot.id, ...postData },
      status: 200
    };
  } catch (error) {
    return handleFirestoreError(error);
  }
};

export const updateBlogPost = async ({
  id,
  postData,
  newCoverImage,
  contentImagesToRemove = [],
  newContentImages = []
}: UpdatePostParams): Promise<OperationResult> => {
  try {
    // Validate post data
    const validationError = validatePostData(postData);
    if (validationError) return validationError;

    const docRef = doc(db, "threehighplus/blogNews/PostNews", id);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      return { success: false, error: "Blog post not found", status: 404 };
    }

    const currentData = docSnapshot.data() as newsBlog;
    const updateData: Partial<newsBlog> = {
      ...postData,
      updatedAt: Date()
    };

    // Handle cover image update
    if (newCoverImage !== undefined) {
      if (newCoverImage === null) {
        // Remove existing cover
        if (currentData.coverImageUrl) {
          await deleteFile(currentData.coverImageUrl);
          updateData.coverImageUrl = null;
        }
      } else {
        // Validate and upload new cover
        const validation = await validateFile(newCoverImage, {
          allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
        });
        if (!validation.valid) {
          return { success: false, error: `Cover image: ${validation.error}`, status: 400 };
        }

        const { url } = await uploadFile(newCoverImage, 'post_covers');
        updateData.coverImageUrl = url;
        
        // Delete old cover if exists
        if (currentData.coverImageUrl) {
          await deleteFile(currentData.coverImageUrl).catch(console.error);
        }
      }
    }

    // Handle content images
    let currentContentImages = Array.isArray(currentData.contentImage) 
      ? [...currentData.contentImage] 
      : currentData.contentImage 
        ? [currentData.contentImage] 
        : [];

    // Remove specified images
    if (contentImagesToRemove.length > 0) {
      await deleteFiles(contentImagesToRemove).catch(console.error);
      currentContentImages = currentContentImages.filter(
        url => !contentImagesToRemove.includes(url)
      );
    }

    // Add new images
    if (newContentImages.length > 0) {
      for (const img of newContentImages) {
        const validation = await validateFile(img);
        if (!validation.valid) {
          return { success: false, error: `Content image: ${validation.error}`, status: 400 };
        }
      }

      const results = await uploadFiles(newContentImages, 'content_images');
      currentContentImages.push(...results.map(r => r.url));
    }

    updateData.contentImage = currentContentImages.length === 1 
      ? currentContentImages[0] 
      : currentContentImages;

    await updateDoc(docRef, updateData);
    const updatedSnapshot = await getDoc(docRef);
    
    return {
      success: true,
      data: { id: updatedSnapshot.id, ...updatedSnapshot.data() as newsBlog },
      status: 200
    };
  } catch (error) {
    return handleFirestoreError(error);
  }
};

export const deleteBlogPost = async (id: string): Promise<OperationResult> => {
  try {
    const docRef = doc(db, "threehighplus/blogNews/PostNews", id);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      return { success: false, error: "Post not found", status: 404 };
    }

    const postData = docSnapshot.data() as newsBlog;

    // Delete all associated images
    const imagesToDelete = [
      ...(postData.coverImageUrl ? [postData.coverImageUrl] : []),
      ...(Array.isArray(postData.contentImage) 
        ? postData.contentImage 
        : postData.contentImage ? [postData.contentImage] : [])
    ];

    if (imagesToDelete.length > 0) {
      await deleteFiles(imagesToDelete).catch(console.error);
    }

    await deleteDoc(docRef);
    return { success: true, status: 204 };
  } catch (error) {
    return handleFirestoreError(error);
  }
};

// ===================
// ADDITIONAL FEATURES
// ===================

export const getFeaturedPosts = async (limitCount = 3): Promise<OperationResult<newsBlog[]>> => {
  try {
    const q = query(
      postNewsCollection,
      where('published', '==', true),
      where('featured', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as newsBlog
    }));

    return { success: true, data, status: 200 };
  } catch (error) {
    const handleFirestoreError = (error: unknown): OperationResult<newsBlog[]> => {
      console.error("Firestore error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Database operation failed",
        status: 500,
        data: [] // Return an empty array instead of a single object
      };
    };
    return handleFirestoreError(error);
  }
};


export const searchBlogPosts = async (
  searchTerm: string,
  options: PaginationOptions = {}
): Promise<OperationResult<newsBlog[]> & PaginatedResult> => {
  try {
    const trimmedTerm = searchTerm.trim().toLowerCase();
    
    if (!trimmedTerm) {
      return {
        success: false,
        error: "Search term cannot be empty",
        status: 400,
        data: [],
        lastVisible: null,
        hasMore: false
      };
    }

    const { data, ...rest } = await getBlogNews(options);
    
    if (!data) {
      return { 
        success: false, 
        error: "Failed to fetch posts", 
        status: 500, 
        data: [], 
        lastVisible: null, 
        hasMore: false 
      };
    }

    const filteredData = data.filter(post => {
      // Search in basic string fields
      const basicFieldsMatch = [
        post.title,
        post.overview,
        post.tags
      ].some(field => field?.toLowerCase().includes(trimmedTerm));

      // Search in content sub-news
      const contentMatch = post.content.some(sub => 
        sub.title?.toLowerCase().includes(trimmedTerm) || 
        sub.news?.toLowerCase().includes(trimmedTerm)
      );

      // Search in categories
      const categoryMatch = post.categories.some(cat => 
        cat.title?.toLowerCase().includes(trimmedTerm)
      );

      // Search in author information
      const authorMatch = post.author.some(author => 
        author.name?.toLowerCase().includes(trimmedTerm) ||
        author.email?.toLowerCase().includes(trimmedTerm)
      );

      // Search in comments
      const commentMatch = post.comments?.some(comment => 
        comment.username?.toLowerCase().includes(trimmedTerm) ||
        comment.email?.toLowerCase().includes(trimmedTerm) ||
        comment.subject?.toLowerCase().includes(trimmedTerm) ||
        comment.content?.toLowerCase().includes(trimmedTerm)
      ) || false;

      return basicFieldsMatch || contentMatch || categoryMatch || authorMatch || commentMatch;
    });

    return {
      ...rest,
      success: true,
      data: filteredData,
      status: 200
    };
  } catch (error) {
    return {
      ...handleFirestoreError(error),
      data: [],
      lastVisible: null,
      hasMore: false
    };
  }
};