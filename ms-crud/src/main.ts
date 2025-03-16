import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProfileModule } from './modules/profile.module';

async function bootstrap() {
  const app = await NestFactory.create(ProfileModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
