import * as z from "zod";

const passwordSchema = z.string()
  .min(8, { message: 'minimum of 8 characters required'})
  .max(20, { message: 'maximum of 20 characters expected' })
  .refine((password) => /[A-Z]/.test(password), { message: 'must contain upper case letter'})
  .refine((password) => /[a-z]/.test(password), { message: 'must contain lower case'})
  .refine((password) => /[0-9]/.test(password), { message: 'must contain numbers'})
  .refine((password) => /[!@#%^&*]/.test(password), { message: 'must contain special characters'});

export const newPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, { message: "password did not match", path: ['confirmPassword']})

export const loginSchema = z.object({
  email: z.string().email({ message: "email is required" }),
  password: passwordSchema,
  
  code: z.optional(z.string()),
})
  

export const registerSchema = z.object({
  email: z.string().email({ message: "email is required" }),
  password: z.string().min(6, { message: "password is required" }),
  confirmPassword: z.string(),
  name: z.string().min(1, { message: "name is required" }),
})
.refine((data) => data.password === data.confirmPassword, { message: "password did not match", path: ['confirmPassword']})

export const resetSchema = z.object({
  email: z.string().email({ message: "email is required" }),
});
