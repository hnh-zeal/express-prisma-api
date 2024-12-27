import { z } from 'zod';

export const loginSchema = z.object({
  loginId: z
    .string({
      required_error: 'Login ID is required',
      invalid_type_error: 'Login ID must be a string'
    })
    .min(6, { message: 'Min Login ID is 6.' }),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string'
    })
    .min(6, { message: 'Min Password is 6.' })
});
