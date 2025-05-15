import {EmployeeTour} from './hrandusers'
export interface Task {
    id?: string;
    TaskName: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export type TaskStatus = "open" | "inprogress" | "completed";
export interface TaskDescriptions {
    id?: string;
    TaskDesc: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface EmployeeTask {
    id?: string;
    TaskDesc: TaskDescriptions[];
    employeeId: string;
    employee?: EmployeeTour;
    taskId: string;
    task?: Task;
    status: TaskStatus;
    createdAt?: Date;
    updatedAt?: Date;
}
