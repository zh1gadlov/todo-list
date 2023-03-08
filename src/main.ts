import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { ConfigService } from './config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { });

  const options = new DocumentBuilder()
    .setTitle('CONTENTS API')
    .setVersion('1.0')
    .build();

  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`/swagger/`, app, document);

  const configService: ConfigService = app.get(ConfigService);

  await app.listen(configService.get('PORT'));
}

bootstrap();
process.on('uncaughtException', e=> {
  console.log(e);
});

process.on('unhandledRejection', e=> {
  console.log(e);
});
