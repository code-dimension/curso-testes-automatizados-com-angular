export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export type TaskWithoutId = Omit<Task, 'id'>;
