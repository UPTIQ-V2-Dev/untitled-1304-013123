import { Todo } from '../types/todo';

export const mockTodos: Todo[] = [
  {
    id: '1',
    text: 'Learn React 19 features',
    completed: false,
    createdAt: new Date('2024-01-15T10:00:00.000Z'),
    updatedAt: new Date('2024-01-15T10:00:00.000Z'),
  },
  {
    id: '2',
    text: 'Set up Vite project',
    completed: true,
    createdAt: new Date('2024-01-14T09:00:00.000Z'),
    updatedAt: new Date('2024-01-15T11:00:00.000Z'),
  },
  {
    id: '3',
    text: 'Configure Tailwind CSS',
    completed: true,
    createdAt: new Date('2024-01-13T14:30:00.000Z'),
    updatedAt: new Date('2024-01-14T16:00:00.000Z'),
  },
  {
    id: '4',
    text: 'Install Shadcn UI components',
    completed: false,
    createdAt: new Date('2024-01-16T08:15:00.000Z'),
    updatedAt: new Date('2024-01-16T08:15:00.000Z'),
  },
  {
    id: '5',
    text: 'Write unit tests',
    completed: false,
    createdAt: new Date('2024-01-17T13:45:00.000Z'),
    updatedAt: new Date('2024-01-17T13:45:00.000Z'),
  },
];