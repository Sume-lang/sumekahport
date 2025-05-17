import { app } from '@/lib/firebase';
import { newsBlog } from '@/type/threehighplus/postnews';
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  getDocs,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import { put, del } from '@vercel/blob'; // Changed from POST/DELETE imports

const db = getFirestore(app);
const postNewsCollection = collection(db, "threehighplus", "blogNews", "postnews");

interface CreatePostParams {
  postData: Omit<newsBlog, "id" | "createdAt" | "updatedAt" | "coverImageUrl" | "contentImage">;
  coverImage?: File | null;
  contentImages?: File[];
}

interface UpdatePostParams {
  id: string;
  postData: Partial<Omit<newsBlog, "id" | "createdAt" | "updatedAt">>;
  newCoverImage?: File | null;
  contentImagesToRemove?: string[];
  newContentImages?: File[];
}

export const createBlogPost = async ({
  postData,
  coverImage,
  contentImages = []
}: CreatePostParams): Promise<newsBlog> => {
  try {
    // Upload cover image if provided
    let coverImageUrl: string | null = null;
    if (coverImage) {
      const { url } = await put(`covers/${Date.now()}_${coverImage.name}`, coverImage, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      coverImageUrl = url;
    }

    // Upload content images if provided
    const contentImage: string[] = [];
    for (const image of contentImages) {
      const { url } = await put(`content/${Date.now()}_${image.name}`, image, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      contentImage.push(url);
    }

    // Convert to single string if only one image
    const finalContentImage = contentImage.length === 1 ? contentImage[0] : contentImage;

    const docRef = await addDoc(postNewsCollection, {
      ...postData,
      coverImageUrl,
      contentImage: finalContentImage,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      published: postData.status === 'publish'
    });

    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Failed to create blog post");
    }

    return {
      id: docRef.id,
      ...(docSnap.data() as newsBlog)
    };
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw error;
  }
};
export const getBlogPostById = async (id: string): Promise<newsBlog | null> => {
  try {
    const docRef = doc(db, "threehighplus", "blogNews", "postnews", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
      } as newsBlog;
    }
    return null;
  } catch (error) {
    console.error("Error getting blogPost by ID:", error);
    throw error;
  }
}
export const getAllBlogPosts = async (): Promise<newsBlog[]> => {
  try {
    const querySnapshot = await getDocs(postNewsCollection);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as newsBlog[];
  } catch (error) {
    console.error("Error getting blog posts:", error);
    throw error;
  }
}

export const updateBlogPost = async ({
  id,
  postData,
  newCoverImage,
  contentImagesToRemove,
  newContentImages
}: UpdatePostParams): Promise<{ success: boolean; updatedPost?: newsBlog; error?: string }> => {
  try {
    const docRef = doc(db, "threehighplus", "blogNews", "postnews", id);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      throw new Error("Blog post not found");
    }

    const currentData = docSnapshot.data() as newsBlog;
    const updateData: Partial<newsBlog> = {
      ...postData,
      updatedAt: new Date().toISOString() // Fixed Date() to proper ISO string
    };

    // Handle status and published sync
    if (postData.status) {
      updateData.published = postData.status === 'publish';
    }

    // Handle cover image update
    if (newCoverImage !== undefined) {
      if (newCoverImage === null) {
        // Remove existing cover image
        if (currentData.coverImageUrl) {
          await del(currentData.coverImageUrl, {
            token: process.env.BLOB_READ_WRITE_TOKEN,
          });
          updateData.coverImageUrl = null;
        }
      } else if (newCoverImage instanceof File) {
        // Upload new cover image and delete old one
        if (currentData.coverImageUrl) {
          await del(currentData.coverImageUrl, {
            token: process.env.BLOB_READ_WRITE_TOKEN,
          });
        }
        const { url } = await put(`covers/${Date.now()}_${newCoverImage.name}`, newCoverImage, {
          access: 'public',
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });
        updateData.coverImageUrl = url;
      }
    }

    // Handle content images
    if (contentImagesToRemove || newContentImages) {
      let currentContentImages = Array.isArray(currentData.contentImage) 
        ? [...currentData.contentImage] 
        : currentData.contentImage 
          ? [currentData.contentImage] 
          : [];

      // Remove specified images
      if (contentImagesToRemove) {
        await Promise.all(contentImagesToRemove.map(url => 
          del(url, { token: process.env.BLOB_READ_WRITE_TOKEN })
        ));
        currentContentImages = currentContentImages.filter(
          url => !contentImagesToRemove.includes(url)
        );
      }

      // Add new content images
      if (newContentImages) {
        const uploadPromises = newContentImages.map(async (image) => {
          const { url } = await put(`content/${Date.now()}_${image.name}`, image, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN,
          });
          return url;
        });
        const newUrls = await Promise.all(uploadPromises);
        currentContentImages.push(...newUrls);
      }

      // Convert to single string if only one image remains
      updateData.contentImage = currentContentImages.length === 1 
        ? currentContentImages[0] 
        : currentContentImages;
    }

    await updateDoc(docRef, updateData);

    const updatedSnapshot = await getDoc(docRef);
    const updatedPost = {
      id: updatedSnapshot.id,
      ...updatedSnapshot.data()
    } as newsBlog;

    return {
      success: true,
      updatedPost
    };
  } catch (error) {
    console.error("Error updating blog post:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update blog post"
    };
  }
};

export const deleteBlogPost = async (id: string): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!id) {
      return { success: false, error: "No ID provided" };
    }

    const docRef = doc(db, "threehighplus", "blogNews", "postnews", id);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      return { success: false, error: "Post not found" };
    }

    const postData = docSnapshot.data() as newsBlog;

    // Delete cover image if exists
    if (postData.coverImageUrl) {
      await del(postData.coverImageUrl, {
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
    }

    // Delete all content images if exist
    if (postData.contentImage) {
      const imagesToDelete = Array.isArray(postData.contentImage) 
        ? postData.contentImage 
        : [postData.contentImage];
      
      await Promise.all(imagesToDelete.map(url => 
        del(url, { token: process.env.BLOB_READ_WRITE_TOKEN })
      ));
    }

    // Delete the document
    await deleteDoc(docRef);

    return { success: true };
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete blog post"
    };
  }
};

// Keep other functions (getBlogPostById, getAllBlogPosts, updatePostStatus) the same as they were