import { app } from '@/lib/firebase'
import { EmployeeTour } from '@/type/threehighplus/hrandusers'
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
const employeeCollections = collection(db, 'threehighplus',
    'employeemanagements', 'employeetour');
export const createEmployeeTour = async (newEmployeeData: Omit<EmployeeTour, "id" | 'createdAt' | 'updatedAt'>) => {
    const newEmployee = {
        ...newEmployeeData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };
    try {
        const docRef = await addDoc(employeeCollections, newEmployee);
        return { id: docRef.id, ...newEmployee };
    } catch (error) {
        console.log("Error creating Employee:", error);
    }
}
export const updateEmployeeTour = async(id:string, employeeData:Partial<EmployeeTour>) => {
    try {
        const docRef = doc(db, "threehighplus", "employeemanagements", "employeetour", id);
        await updateDoc(docRef, {
            ...employeeData,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error updating Employee:", error);
        throw error;
    }
};
export const deleteEmployeeTour = async(id:string):Promise<void> => {
    try {
        const docRef = doc(db, "threehighplus", "employeemanagements", "employeetour", id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error deleting Employee:", error);
        throw error;
    }
};
export const getAllEmplyeeTour = async():Promise<EmployeeTour[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, "threehighplus", "employeemanagements", "employeetour"));
        return querySnapshot.docs.map((doc) => ({
            id: doc.id, // Include the Firestore document ID
            ...(doc.data() as EmployeeTour),
        }))
    } catch (error) {
        console.log("Error getting all Employees:", error);
        throw error;
    }
};
export const getEmplyeeTourById = async(id:string):Promise<EmployeeTour | null> => {
    try {
        const docRef = doc(db, "threehighplus", "employeemanagements", "employeetour", id);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            ...data,
          } as EmployeeTour;
        }
        return null;
      } catch (error) {
        console.error("Error getting blogPost by ID:", error);
        throw error;
      }
};

export const getEmployeeToursByStatus = async(status: 'active' | 'inactive'):Promise<EmployeeTour[]> => {
    try {
        const q = query(collection(db, "threehighplus", "employeemanagements", "employeetour"), where("status", "==", status));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id, // Include the Firestore document ID
            ...(doc.data() as EmployeeTour),
        }))
    } catch (error) {
        console.log(`Error getting ${status} Employees:`, error);
        throw error;
    }
};
export const getEmployeeToursByPosition = async(position:'Guide' | 'Driver'|'Porter'):Promise<EmployeeTour[]> => {
    try {
        const q = query(collection(db, "threehighplus", "employeemanagements", "employeetour"), where("employemnetposition", "==", position));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id, // Include the Firestore document ID
            ...(doc.data() as EmployeeTour),
        }))
    } catch (error) {
        console.log(`Error getting ${position} Employees:`, error);
        throw error;
    }
};
export const getEmployeeToursByEmploymentStatus = async(employementstatus:'parttime' | 'contract'|'permanent'):Promise<EmployeeTour[]> => {
    try {
        const q = query(collection(db, "threehighplus", "employeemanagements", "employeetour"), where("employemnetstatus", "==", employementstatus));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id, // Include the Firestore document ID
            ...(doc.data() as EmployeeTour),
        }))
    } catch (error) {
        console.log(`Error getting ${employementstatus} Employees:`, error);
        throw error;
    }
};
