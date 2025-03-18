import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileController } from '../controllers/profile.controller';
import { ProfileService } from '../services/profile.service';
import { ConfigModule } from '@nestjs/config';
import { Profile, ProfileSchema } from '../schemas/profile.schema';
import { JwtAuthGuard } from '../guards/profile.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    // se configura la conexion con el archivo .env y se importa el modulo de mongoose
    ConfigModule.forRoot({ 
        envFilePath: '.env',
        isGlobal: true,
      }),
      MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/testdb'), 
      MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, JwtAuthGuard, JwtService], // Agregar JwtService a los providers
  exports: [ProfileService, JwtAuthGuard, JwtService], // Exportar JwtService
})
export class ProfileModule {}
