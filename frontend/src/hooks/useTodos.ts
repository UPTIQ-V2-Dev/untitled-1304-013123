import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTodos, createTodo, updateTodo, deleteTodo, clearCompletedTodos } from '../services/todoApi';
import { Todo, CreateTodoInput, UpdateTodoInput } from '../types/todo';

const TODOS_QUERY_KEY = ['todos'];

export const useTodos = () => {
  return useQuery({
    queryKey: TODOS_QUERY_KEY,
    queryFn: getTodos,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createTodo,
    onMutate: async (newTodoInput: CreateTodoInput) => {
      await queryClient.cancelQueries({ queryKey: TODOS_QUERY_KEY });
      
      const previousTodos = queryClient.getQueryData<Todo[]>(TODOS_QUERY_KEY);
      
      const optimisticTodo: Todo = {
        id: `temp-${Date.now()}`,
        text: newTodoInput.text,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      queryClient.setQueryData<Todo[]>(TODOS_QUERY_KEY, old => 
        old ? [optimisticTodo, ...old] : [optimisticTodo]
      );
      
      return { previousTodos };
    },
    onError: (err, newTodoInput, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(TODOS_QUERY_KEY, context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateTodoInput }) => 
      updateTodo(id, input),
    onMutate: async ({ id, input }) => {
      await queryClient.cancelQueries({ queryKey: TODOS_QUERY_KEY });
      
      const previousTodos = queryClient.getQueryData<Todo[]>(TODOS_QUERY_KEY);
      
      queryClient.setQueryData<Todo[]>(TODOS_QUERY_KEY, old => 
        old?.map(todo => 
          todo.id === id 
            ? { ...todo, ...input, updatedAt: new Date() }
            : todo
        ) || []
      );
      
      return { previousTodos };
    },
    onError: (err, variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(TODOS_QUERY_KEY, context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteTodo,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: TODOS_QUERY_KEY });
      
      const previousTodos = queryClient.getQueryData<Todo[]>(TODOS_QUERY_KEY);
      
      queryClient.setQueryData<Todo[]>(TODOS_QUERY_KEY, old => 
        old?.filter(todo => todo.id !== id) || []
      );
      
      return { previousTodos };
    },
    onError: (err, id, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(TODOS_QUERY_KEY, context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
  });
};

export const useClearCompletedTodos = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: clearCompletedTodos,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: TODOS_QUERY_KEY });
      
      const previousTodos = queryClient.getQueryData<Todo[]>(TODOS_QUERY_KEY);
      
      queryClient.setQueryData<Todo[]>(TODOS_QUERY_KEY, old => 
        old?.filter(todo => !todo.completed) || []
      );
      
      return { previousTodos };
    },
    onError: (err, variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(TODOS_QUERY_KEY, context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
  });
};