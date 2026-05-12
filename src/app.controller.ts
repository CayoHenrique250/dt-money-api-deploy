import { Controller, Get, Header, Redirect } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { getSwaggerUiShellHtml } from './config/swagger-cdn';

@ApiExcludeController()
@Controller()
export class AppController {
  @Get()
  @Redirect('/api', 302)
  root(): void {
    // Swagger UI is served at /api
  }

  @Get(['api', 'api/'])
  @Header('Content-Type', 'text/html; charset=utf-8')
  swaggerUi(): string {
    return getSwaggerUiShellHtml('/api-json');
  }
}
