import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:8000',
    credentials: true,
  });
  const port = 8000;
  await app.listen(port);
  logger.log(`bootstrap is Up on port ${port}`);
}
bootstrap();
