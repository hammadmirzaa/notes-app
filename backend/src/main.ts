import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow the React frontend (running on a different port) to call this API
  app.enableCors({
    origin: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Notes backend running on http://localhost:${port}`);
}
bootstrap();
