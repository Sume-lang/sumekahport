import { app } from '@/lib/firebase';
import { uploadFile } from '@/lib/blob';
import { EmployeeTour } from '@/type/threehighplus/hrandusers';
import {
    collection,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    getDoc,
    getDocs,
    getFirestore,
    query,
    where,
} from "firebase/firestore";

const db = getFirestore(app);
const employeeCollections = collection(db, 'threehighplus', 'employeemanagements', 'employeetour');

interface CreateEmployeeTourParams {
    employeeData: Omit<EmployeeTour, "id" | 'createdAt' | 'updatedAt' | 'profileImageUrl'>;
    profileImage?: File;
}

interface UpdateEmployeeTourParams {
    id: string;
    employeeData: Partial<Omit<EmployeeTour, 'id' | 'createdAt' | 'updatedAt'>>;
    newProfileImage?: File;
}

interface UpdateEmployeeTourResult {
    success: boolean;
    updatedEmployee?: EmployeeTour;
    error?: string;
}

export const createEmployeeTour = async ({
    employeeData,
    profileImage
}: CreateEmployeeTourParams): Promise<EmployeeTour> => {
    try {
        let profileImageUrl = "";

        // Upload profile image if provided
        if (profileImage) {
            const { url } = await uploadFile(profileImage);
            profileImageUrl = url;
        }

        const docRef = await addDoc(employeeCollections, {
            ...employeeData,
            profileImageUrl,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        // Get the newly created document to return all fields with proper timestamps
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throw new Error("Failed to create employee");
        }

        return {
            id: docRef.id,
            ...(docSnap.data() as EmployeeTour)
        };
    } catch (error) {
        console.error("Error creating Employee:", error);
        throw error;
    }
}


// export const createEmployeeTour = async ({ 
//     employeeData, 
//     profileImage 
// }: CreateEmployeeTourParams): Promise<EmployeeTour> => {
//     try {
//         // Initialize with empty string if no image
//         let profileImageUrl = ""; 
        
//         // Upload profile image if provided
//         if (profileImage) {
//             const { url } = await uploadFile(profileImage);
//             profileImageUrl = url;
//         }

//         const newEmployee = {
//             ...employeeData,
//             profileImageUrl, // Now guaranteed to be a string
//             createdAt: serverTimestamp(),
//             updatedAt: serverTimestamp(),
//         };

//         const docRef = await addDoc(employeeCollections, newEmployee);
        
//         // Return the created document with proper types
//         return { 
//             id: docRef.id, 
//             ...newEmployee,
//             // Convert Firestore timestamp to Date if needed
//             createdAt: newEmployee.createdAt.toDate(),
//             updatedAt: newEmployee.updatedAt.toDate(),
//         };
//     } catch (error) {
//         console.error("Error creating Employee:", error);
//         throw error;
//     }
// }















export const updateEmployeeTour = async ({
    id,
    employeeData,
    newProfileImage
}: UpdateEmployeeTourParams): Promise<UpdateEmployeeTourResult> => {
    try {
        // Validate ID exists
        if (!id) {
            throw new Error("Employee ID is required");
        }
        const docRef = doc(db, "threehighplus", "employeemanagements", "employeetour", id);
        
        // Verify document exists before updating
        const docSnapshot = await getDoc(docRef);
        if (!docSnapshot.exists()) {
            throw new Error("Employee not found");
        }
        const updateData: Partial<EmployeeTour> = {
            ...employeeData,
            updatedAt: Date() // Ensure updatedAt is always set
        };
        // Handle new profile image upload if provided
        if (newProfileImage) {
            // Delete old image if exists
            const currentData = docSnapshot.data() as EmployeeTour;
            if (currentData.profileImageUrl) {
                await deleteEmployeeProfileImage(currentData.profileImageUrl);
            }

            // Upload new image
            const { url } = await uploadFile(newProfileImage);
            updateData.profileImageUrl = url;
        }
        // Perform the update
        await updateDoc(docRef, updateData);
        // Get the updated document
        const updatedSnapshot = await getDoc(docRef);
        const updatedEmployee = {
            id: updatedSnapshot.id,
            ...updatedSnapshot.data()
        } as EmployeeTour;
        return {
            success: true,
            updatedEmployee
        };
    } catch (error) {
        console.error("Error updating Employee:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to update employee"
        };
    }
};

export const deleteEmployeeTour = async (id: string): Promise<void> => {
    try {
        const docRef = doc(db, "threehighplus", "employeemanagements", "employeetour", id);
        
        // Optional: Add logic to delete associated blob storage files here
        // You would need to store the blob URLs in Firestore to reference them
        
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error deleting Employee:", error);
        throw error;
    }
};

export const getAllEmplyeeTour = async (): Promise<EmployeeTour[]> => {
    try {
        const querySnapshot = await getDocs(employeeCollections);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as EmployeeTour),
        }));
    } catch (error) {
        console.error("Error getting all Employees:", error);
        throw error;
    }
};

export const getEmplyeeTourById = async (id: string): Promise<EmployeeTour | null> => {
    try {
        const docRef = doc(db, "threehighplus", "employeemanagements", "employeetour", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data(),
            } as EmployeeTour;
        }
        return null;
    } catch (error) {
        console.error("Error getting Employee by ID:", error);
        throw error;
    }
};

export const getEmployeeToursByStatus = async (status: 'active' | 'inactive'): Promise<EmployeeTour[]> => {
    try {
        const q = query(employeeCollections, where("status", "==", status));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as EmployeeTour),
        }));
    } catch (error) {
        console.error(`Error getting ${status} Employees:`, error);
        throw error;
    }
};

export const getEmployeeToursByPosition = async (position: 'Guide' | 'Driver' | 'Porter'): Promise<EmployeeTour[]> => {
    try {
        const q = query(employeeCollections, where("employemnetposition", "==", position));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as EmployeeTour),
        }));
    } catch (error) {
        console.error(`Error getting ${position} Employees:`, error);
        throw error;
    }
};

export const getEmployeeToursByEmploymentStatus = async (employementstatus: 'parttime' | 'contract' | 'permanent'): Promise<EmployeeTour[]> => {
    try {
        const q = query(employeeCollections, where("employemnetstatus", "==", employementstatus));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as EmployeeTour),
        }));
    } catch (error) {
        console.error(`Error getting ${employementstatus} Employees:`, error);
        throw error;
    }
};

// Additional utility function to handle blob deletion if needed
export const deleteEmployeeProfileImage = async (imageUrl: string): Promise<void> => {
    try {
        // Note: Vercel Blob doesn't currently have a delete API in @vercel/blob
        // You would need to implement this using their REST API if needed
        console.warn('Blob deletion not implemented. Image remains at:', imageUrl);
    } catch (error) {
        console.error("Error deleting profile image:", error);
        throw error;
    }
};