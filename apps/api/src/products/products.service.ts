import { Injectable, NotFoundException } from "@nestjs/common";

import { ProductsRepository } from "./products.repository";

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepo: ProductsRepository) {}

  findMany() {
    return this.productsRepo.findMany();
  }

  async findById(id: string) {
    const product = await this.productsRepo.findById(id);
    if (!product) throw new NotFoundException("Product not found");
    return product;
  }
}
