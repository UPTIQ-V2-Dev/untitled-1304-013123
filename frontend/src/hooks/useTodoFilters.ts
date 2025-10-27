import { useState, useMemo } from 'react';
import { Todo, TodoFilter } from '../types/todo';
import { filterTodos, sortTodosByDate } from '../utils/todoUtils';

export const useTodoFilters = (todos: Todo[] = []) => {
  const [activeFilter, setActiveFilter] = useState<TodoFilter>('all');

  const filteredTodos = useMemo(() => {
    const filtered = filterTodos(todos, activeFilter);
    return sortTodosByDate(filtered);
  }, [todos, activeFilter]);

  const filterOptions: { value: TodoFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return {
    activeFilter,
    setActiveFilter,
    filteredTodos,
    filterOptions,
  };
};