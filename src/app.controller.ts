import { Controller, Get, Header, Redirect } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { getSwaggerUiShellHtml } from './config/swagger-cdn';

@ApiExcludeController()
@Controller()
export class AppController {
  @Get()
  @Redirect('/docs', 302)
  root(): void {
    // Swagger UI is served at /docs (avoids stale cached HTML that used to live at /api).
  }

  /** Old bookmarks / cached service worker may still hit /api — send them to the CDN UI. */
  @Get(['api', 'api/'])
  @Redirect('/docs', 302)
  legacyApiDocs(): void {}

  @Get(['docs', 'docs/'])
  @Header('Content-Type', 'text/html; charset=utf-8')
  @Header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
  @Header('Pragma', 'no-cache')
  swaggerUi(): string {
    return getSwaggerUiShellHtml('/api-json');
  }
}
