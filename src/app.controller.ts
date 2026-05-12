import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Redirect('/api', 302)
  root(): void {
    // Swagger UI is served at /api (see api/index.ts / main.ts)
  }
}
