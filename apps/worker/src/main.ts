import "reflect-metadata";

import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { loadEnv } from "./config/env";

async function bootstrap() {
  loadEnv();

  // Worker doesn't expose HTTP server; it just bootstraps Nest context.
  await NestFactory.createApplicationContext(AppModule);
}

void bootstrap();
