import * as dotenv from "dotenv";

export type AppEnv = Readonly<{
  NODE_ENV: "development" | "test" | "production";
  PORT: number;
}>;

function parseNodeEnv(value: string | undefined): AppEnv["NODE_ENV"] {
  if (value === "production" || value === "test" || value === "development") return value;
  return "development";
}

function parsePort(value: string | undefined): number {
  if (!value) return 3000;
  const n = Number(value);
  if (!Number.isInteger(n) || n <= 0) throw new Error(`Invalid PORT: ${value}`);
  return n;
}

/**
 * Load `.env` and return validated runtime env.
 * Keep it minimal: only values used by the app are surfaced here.
 */
export function loadEnv(): AppEnv {
  dotenv.config();

  return {
    NODE_ENV: parseNodeEnv(process.env.NODE_ENV),
    PORT: parsePort(process.env.PORT)
  };
}


