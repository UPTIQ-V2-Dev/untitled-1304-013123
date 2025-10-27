import { useState } from 'react';
import { Trash2, Edit3, Check, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { cn } from '../../lib/utils';
import { Todo } from '../../types/todo';
import { useUpdateTodo, useDeleteTodo } from '../../hooks/useTodos';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const handleToggleComplete = async () => {
    try {
      await updateTodoMutation.mutateAsync({
        id: todo.id,
        input: { completed: !todo.completed }
      });
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodoMutation.mutateAsync(todo.id);
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSaveEdit = async () => {
    if (editText.trim() && editText !== todo.text) {
      try {
        await updateTodoMutation.mutateAsync({
          id: todo.id,
          input: { text: editText.trim() }
        });
      } catch (error) {
        console.error('Failed to update todo:', error);
      }
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-3 p-4 border rounded-lg bg-card">
        <Checkbox checked={todo.completed} disabled />
        <Input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
          autoFocus
        />
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleSaveEdit}
            disabled={!editText.trim() || updateTodoMutation.isPending}
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCancelEdit}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={handleToggleComplete}
        disabled={updateTodoMutation.isPending}
      />
      <span
        className={cn(
          "flex-1 text-sm",
          todo.completed && "line-through text-muted-foreground"
        )}
      >
        {todo.text}
      </span>
      <div className="flex gap-1">
        <Button
          size="sm"
          variant="ghost"
          onClick={handleStartEdit}
          disabled={updateTodoMutation.isPending}
        >
          <Edit3 className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleDelete}
          disabled={deleteTodoMutation.isPending}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};