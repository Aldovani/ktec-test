import z from "zod";

export const updateUserBodySchema = z.object({
  name: z.string().optional(),
  email: z.email().optional(),
  password: z.string().min(6).optional(),
});

export type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>;
