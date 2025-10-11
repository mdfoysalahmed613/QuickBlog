import { z } from "zod";
export const usersSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(16, { message: "Name must be at most 16 characters long" }),
  email: z.email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(100, { message: "Password must be at most 100 characters long" }),
});

export type UsersSchema = z.infer<typeof usersSchema>;
