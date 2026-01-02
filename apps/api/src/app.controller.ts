import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get("/")
  getWelcome() {
    return { message: "Welcome" };
  }

  @Get("/heath")
  getHealth() {
    return { ok: true };
  }
}


