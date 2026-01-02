import * as dotenv from "dotenv";

export type WorkerEnv = Readonly<{
  NODE_ENV: "development" | "test" | "production";
}>;

function parseNodeEnv(value: string | undefined): WorkerEnv["NODE_ENV"] {
  if (value === "production" || value === "test" || value === "development") return value;
  return "development";
}

export function loadEnv(): WorkerEnv {
  dotenv.config();

  return {
    NODE_ENV: parseNodeEnv(process.env.NODE_ENV)
  };
}


