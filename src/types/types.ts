export interface Project {
    name: string;
    description: string;
    user: string;
    _id?: string;
}

export type Status = "To Do" | "In Progress" | "Done"

export interface Task {
    title: string;
    description: string;
    status: Status;
    project: string;
    _id?: string;
}