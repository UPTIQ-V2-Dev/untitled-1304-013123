import { apiClient } from '../lib/api';
import { Todo, CreateTodoInput, UpdateTodoInput } from '../types/todo';
import { mockTodos } from '../data/todoMockData';

export const getTodos = async (): Promise<Todo[]> => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    return mockTodos;
  }
  
  const response = await apiClient.get<Todo[]>('/todos');
  return response.data;
};

export const createTodo = async (input: CreateTodoInput): Promise<Todo> => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: input.text,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return newTodo;
  }
  
  const response = await apiClient.post<Todo>('/todos', input);
  return response.data;
};

export const updateTodo = async (id: string, input: UpdateTodoInput): Promise<Todo> => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    const existingTodo = mockTodos.find(todo => todo.id === id);
    if (!existingTodo) {
      throw new Error('Todo not found');
    }
    
    const updatedTodo: Todo = {
      ...existingTodo,
      ...input,
      updatedAt: new Date(),
    };
    return updatedTodo;
  }
  
  const response = await apiClient.put<Todo>(`/todos/${id}`, input);
  return response.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    return;
  }
  
  await apiClient.delete(`/todos/${id}`);
};

export const clearCompletedTodos = async (): Promise<void> => {
  if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
    return;
  }
  
  await apiClient.delete('/todos/completed');
};