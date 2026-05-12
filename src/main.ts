import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express from 'express';
import { dirname } from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  //Swagger setup
  const config = new DocumentBuilder()
    .setTitle('DT Money API')
    .setDescription('API para gerenciamento de transações financeiras')
    .setVersion('1.0')
    .addTag('transactions', 'Endpoints relacionados a transações financeiras')
    .addTag('users', 'Endpoints relacionados a usuários e autenticação')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const expressApp = app.getHttpAdapter().getInstance();
  const swaggerUiRoot = dirname(
    require.resolve('swagger-ui-dist/package.json'),
  );
  expressApp.use('/api', express.static(swaggerUiRoot, { index: false }));

  SwaggerModule.setup('api', app, document);

  // habilitar cors
  app.enableCors();
  await app.listen(process.env.PORT ?? 3333);
}
void bootstrap();
