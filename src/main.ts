import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as session from 'express-session';
import {ValidationPipe} from "@nestjs/common";
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe({
      transform: true,
  }));
  app.use(
      session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
      }),
  );
  await app.listen(process.env.PORT || 8080 );
}

bootstrap();
