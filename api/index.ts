import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import 'dotenv/config';
import { AppModule } from '../src/app.module';

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
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return expressApp as (req: VercelRequest, res: VercelResponse) => void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!server) {
    server = await bootstrap();
  }

  return server(req, res);
}
