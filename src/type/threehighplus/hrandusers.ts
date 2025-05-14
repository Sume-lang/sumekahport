export type EmployementStatus = "parttime" | "contract" | "permanent";
export type Position = "Guide" | "Driver" | "Porter";
export type GuideType = "Trekking" | "Panorama" | "Camping" | "Diving" | "Snorkling" | "Walking Area";
export type Status = "active" | "inactive";




// export interface Users {
//     id: string;
//     name: string;
//     email: string;
//     password: string;
//     role: 'admin' | 'user';
//     createdAt: Date;
//     updatedAt: Date;
//     lastLogin: Date;
//     isActive: boolean;
//     isVerified: boolean;
//     profilePicture?: string;
//     bio?: string;
// }

export interface EmployeeTour {
    id?: string;
    firstname: string;
    lastname: string;
    status: Status;
    employementstatus: EmployementStatus[];
    employemnetposition: Position[];
    profileImageUrl?: string;
    address: string;
    phone: string;
    experience: string;
    guidetype: GuideType[];
    profilepic: string;
    bio: string;
    updatedAt: string
    createdAt: string;

}


// export type EmploymentStatus = "parttime" | "contract" | "permanent";
// export type Position = "Guide" | "Driver" | "Porter";
// export type GuideType = "Trekking" | "Panorama" | "Camping" | "Diving" | "Snorkling" | "Walking Area";
// export type Status = "active" | "inactive";

// export interface EmployeeTour {
//   id: string;
//   firstname: string;
//   lastname: string;
//   status: Status;
//   employementstatus: EmploymentStatus;
//   employemnetposition: Position[];
//   address: string;
//   phone: string;
//   experience: string;
//   guidetype: GuideType[];
//   profilepic: string;
//   bio: string;
// }