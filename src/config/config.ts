import { z } from 'zod';

const envSchema = z.object({
  TELEGRAM_TOKEN: z.string().min(1, "TELEGRAM_TOKEN is required"),
//   API_URL: z.string().url("API_URL must be a valid URL"),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('Invalid environment variables:', env.error.format());
  process.exit(1); // Terminate the application if validation fails
}

export const Config = env.data;
console.log(Config)
