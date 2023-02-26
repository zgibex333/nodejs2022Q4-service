import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { CustomLogger } from './logger/logger.service';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(CustomLogger));
  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    .addServer('/')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/doc', app, document);
  const port = process.env.PORT ?? 4000;
  app.enableCors();
 
  await app.listen(port);
}
bootstrap();
