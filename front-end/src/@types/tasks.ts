// src/@types/task.ts

export interface Task {
  _id: string;
  title: string;
  description?: string;
  dueDate: string;
  completedAt: string | null;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export type Status = 'pending' | 'completed' | 'overdue';