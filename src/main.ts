import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || config.host.PORT;
  await app.listen(port);
  console.info(`running on :${port}`);
}
bootstrap();
