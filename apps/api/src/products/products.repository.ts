import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany() {
    return this.prisma.product.findMany();
  }

  findById(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }
}
