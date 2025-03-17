import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProfileModule } from './modules/profile.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const certPath = path.join(__dirname, '../../secrets/cert.cert');
  const keyPath = path.join(__dirname, '../../secrets/cert.key');
  const httpsOptions = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};
  const app = await NestFactory.create(ProfileModule, { httpsOptions }); // Creando la aplicación
  await app.listen(3000);
}
bootstrap();
