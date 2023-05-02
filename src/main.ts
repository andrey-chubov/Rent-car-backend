import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Main APP');
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Rent cars')
    .setDescription('The rent cars API description')
    .setVersion('1.0')
    .addTag('Booking', 'The section booking requests')
    .addTag('Statistic', 'The section booking statistic requests')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(5000);
  logger.log(`Server started on port: ${5000}`);
}
bootstrap();
