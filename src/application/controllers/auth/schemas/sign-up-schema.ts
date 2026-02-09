import z from "zod";

export const signUpBodySchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  name: z.string(),
});

export type SignUpBodySchema = z.infer<typeof signUpBodySchema>;
