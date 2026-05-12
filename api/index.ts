import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { dirname } from 'node:path';
import 'dotenv/config';
import { AppModule } from '../src/app.module';

// Force Vercel tracing to include generated Prisma runtime files.
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('../node_modules/.prisma/client/default');

let server: ((req: VercelRequest, res: VercelResponse) => void) | null = null;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('DT Money API')
    .setDescription('API para gerenciamento de transacoes financeiras')
    .setVersion('1.0')
    .addTag('transactions', 'Endpoints relacionados a transacoes financeiras')
    .addTag('users', 'Endpoints relacionados a usuarios e autenticacao')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Nest's useStaticAssets often misses swagger-ui-dist on Vercel's traced bundle.
  // Serve assets explicitly from an absolute path so /api/swagger-ui*.js resolve.
  const expressApp = app.getHttpAdapter().getInstance();
  const swaggerUiRoot = dirname(
    require.resolve('swagger-ui-dist/package.json'),
  );
  expressApp.use('/api', express.static(swaggerUiRoot, { index: false }));

  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.init();

  return expressApp as (req: VercelRequest, res: VercelResponse) => void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!server) {
    server = await bootstrap();
  }

  return server(req, res);
}
