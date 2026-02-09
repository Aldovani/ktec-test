import z from "zod";

export const schema = z.object({
  PORT: z.coerce.number().default(8080),
  JWT_SECRET: z.string().default("your-secret-key"),
  MONGO_URI: z.string().default("mongodb://USER:PASSWORD@localhost:27017/"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

export const env = schema.parse(process.env);
