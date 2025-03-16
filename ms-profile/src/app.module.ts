import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './modules/profile.module';

// configuracion de la aplicacion
// se importa el modulo de configuracion de la aplicacion
@Module({
  imports: [
    // se configura la conexion con el archivo .env y se importa el modulo de mongoose
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/testdb'), // se configura la conexion a la base de datos
    ProfileModule, // se importa el modulo de perfil
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
