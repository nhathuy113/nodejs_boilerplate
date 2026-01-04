import { Controller, Get, Param } from "@nestjs/common";

import { ProductsService } from "./products.service";

@Controller("/products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get("/")
  findMany() {
    return this.productsService.findMany();
  }

  @Get("/:id")
  findById(@Param("id") id: string) {
    return this.productsService.findById(id);
  }
}
