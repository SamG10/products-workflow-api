import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AppDataSource } from './data-source';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
      // démarrage du serveur ici...
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });

  app.setGlobalPrefix('v1');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 8080);
}
void bootstrap();
