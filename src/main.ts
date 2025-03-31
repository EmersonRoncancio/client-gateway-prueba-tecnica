import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './configs/dotenv.configs';
import { ExceptionFilter } from './common/filters/rpc-exception.filter';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new ExceptionFilter());

  await app.listen(envs.PORT);
}
bootstrap()
  .then(() => logger.log(`Application is running`))
  .catch(() => logger.error(`Application failed to start`));
