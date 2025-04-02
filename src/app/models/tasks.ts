export interface ITask {
    id: string;
    task: string;
    priorityId: string;
    description: string;
    date: string;
    recurring: string;
    completed: boolean | undefined;
} 
