export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TodoFilter = 'all' | 'active' | 'completed';

export interface CreateTodoInput {
  text: string;
}

export interface UpdateTodoInput {
  text?: string;
  completed?: boolean;
}

export interface TodoStats {
  total: number;
  active: number;
  completed: number;
}