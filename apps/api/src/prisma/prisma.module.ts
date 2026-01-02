import { Global, Module } from "@nestjs/common";

import { PrismaService } from "./prisma.service";

/**
 * Keep this module ready, but don't import it in `AppModule` until DB is configured.
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
