import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Volunteer Event API')
    .setDescription('API to connect volunteers with event organizers')
    .setVersion('1.0')
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document); // Swagger UI at /api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
