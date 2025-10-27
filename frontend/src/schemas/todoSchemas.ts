import { z } from 'zod';

export const createTodoSchema = z.object({
  text: z.string().min(1, 'Todo text is required').max(500, 'Todo text is too long'),
});

export const updateTodoSchema = z.object({
  text: z.string().min(1, 'Todo text is required').max(500, 'Todo text is too long').optional(),
  completed: z.boolean().optional(),
});

export type CreateTodoFormData = z.infer<typeof createTodoSchema>;
export type UpdateTodoFormData = z.infer<typeof updateTodoSchema>;