import { z } from 'zod';

export const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email(),
  message: z.string().max(500, 'Message must be less than 500 characters'),
});

export type FormValues = z.infer<typeof formSchema>;