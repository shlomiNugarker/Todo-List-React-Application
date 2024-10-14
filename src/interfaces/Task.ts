export interface Task {
  id?: string;
  task: string;
  assignee: string;
  priority: Priority;
}

export type Priority = "High" | "Medium" | "Low" | "All";
