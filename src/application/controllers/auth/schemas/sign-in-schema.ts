import z from "zod";

export const signInBodySchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type SignInBodySchema = z.infer<typeof signInBodySchema>;
