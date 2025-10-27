import { TodoItem } from './TodoItem';
import { Todo } from '../../types/todo';
import { CheckCircle } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  isLoading?: boolean;
}

export const TodoList = ({ todos, isLoading }: TodoListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-4 border rounded-lg bg-card">
            <div className="h-4 w-4 bg-muted animate-pulse rounded" />
            <div className="flex-1 h-4 bg-muted animate-pulse rounded" />
            <div className="flex gap-1">
              <div className="h-8 w-8 bg-muted animate-pulse rounded" />
              <div className="h-8 w-8 bg-muted animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-muted-foreground mb-2">No todos yet</h3>
        <p className="text-sm text-muted-foreground">
          Add your first todo above to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};