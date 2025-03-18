import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from '../schemas/profile.schema';
import { ProfileDTO } from 'src/interfaces/profile.dto';

@Injectable() 
export class ProfileService { // Servicio para el perfil
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<ProfileDTO>, // Inyectando del modelo mongoDB
  ) {}

  // Metodo para obtener el perfil basado en el email
  async getProfileByEmail(email: string): Promise<Profile> {
    const profile = await this.profileModel.findOne({ email }).exec(); // Buscando el perfil en la base de datos
    if (!profile) {
      throw new NotFoundException('Perfil no encontrado'); // Si no se encuentra el perfil, se lanza una excepcion
    }
    return profile; // Se retorna el perfil
  }
}