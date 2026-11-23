import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1).optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://codecommit.sec"),
  CONTACT_NOTIFICATION_EMAIL: z.string().email().default("security@codecommit.sec"),
  CONTACT_WEBHOOK_URL: z.string().url().optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(5),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function getValidatedServerEnv(): ServerEnv {
  const parsed = serverEnvSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    CONTACT_NOTIFICATION_EMAIL: process.env.CONTACT_NOTIFICATION_EMAIL,
    CONTACT_WEBHOOK_URL: process.env.CONTACT_WEBHOOK_URL || undefined,
    RESEND_API_KEY: process.env.RESEND_API_KEY || undefined,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL || undefined,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN || undefined,
    RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS,
    RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS,
  });

  if (!parsed.success) {
    return {
      NODE_ENV: "development",
      NEXT_PUBLIC_SITE_URL: "https://codecommit.sec",
      CONTACT_NOTIFICATION_EMAIL: "security@codecommit.sec",
      RATE_LIMIT_WINDOW_MS: 60000,
      RATE_LIMIT_MAX_REQUESTS: 5,
    };
  }

  return parsed.data;
}
