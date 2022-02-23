import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';
import { ValidationException } from './modules/shared/exceptions/validation.exception';
import { ValidationExceptionFilter } from './modules/shared/filters/validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalFilters(new ValidationExceptionFilter())

  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: false,
    exceptionFactory: (erros: ValidationError[]) => {
      const errMsg = {}
      erros.forEach(err => {
        errMsg[err.property] = [...Object.values(err.constraints)]
      })

      return new ValidationException(errMsg)
    }
  }))
  await app.listen(3000);
}
bootstrap();
