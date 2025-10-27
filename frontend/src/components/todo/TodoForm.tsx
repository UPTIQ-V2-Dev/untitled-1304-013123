import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { createTodoSchema, CreateTodoFormData } from '../../schemas/todoSchemas';
import { useCreateTodo } from '../../hooks/useTodos';

export const TodoForm = () => {
  const createTodoMutation = useCreateTodo();
  
  const form = useForm<CreateTodoFormData>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      text: '',
    },
  });

  const onSubmit = async (data: CreateTodoFormData) => {
    try {
      await createTodoMutation.mutateAsync({ text: data.text });
      form.reset();
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Add a new todo..."
                  {...field}
                  disabled={createTodoMutation.isPending}
                  className="flex-1"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          disabled={createTodoMutation.isPending || !form.watch('text').trim()}
          size="sm"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </form>
    </Form>
  );
};