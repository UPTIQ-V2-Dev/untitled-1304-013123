import { Todo, TodoFilter, TodoStats } from '../types/todo';

export const filterTodos = (todos: Todo[], filter: TodoFilter): Todo[] => {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    case 'all':
    default:
      return todos;
  }
};

export const sortTodosByDate = (todos: Todo[]): Todo[] => {
  return [...todos].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const getTodoStats = (todos: Todo[]): TodoStats => {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const active = total - completed;

  return {
    total,
    active,
    completed,
  };
};

export const getFilterLabel = (filter: TodoFilter): string => {
  switch (filter) {
    case 'all':
      return 'All';
    case 'active':
      return 'Active';
    case 'completed':
      return 'Completed';
    default:
      return 'All';
  }
};