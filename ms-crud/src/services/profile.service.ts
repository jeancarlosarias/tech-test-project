import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from '../schemas/profile.schema';
import { ProfileDTO } from 'src/interfaces/profile.dto';
import { UpdateProfileDTO } from 'src/interfaces/updateProfile.dto';
import { JwtAuthGuard } from '../guards/profile.guard';

@Injectable() 
export class ProfileService { // Servicio para el perfil
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<ProfileDTO>, // Inyectando
    private readonly jwtAuthGuard: JwtAuthGuard, // Inyectando JwtAuthGuard
  ) {}

  // Metodo para obtener el perfil basado en el email
  async getProfileByEmail(email: string): Promise<ProfileDTO> {
    const profile = await this.profileModel.findOne({ email }).exec(); // Buscando el perfil en la base de datos
    if (!profile) {
      throw new NotFoundException('Perfil no encontrado'); // Si no se encuentra el perfil, se lanza una excepcion
    }
    return profile; // Se retorna el perfil
  }

    // Metodo para crear un perfil
    async createProfile(profile: ProfileDTO): Promise<{ profile: ProfileDTO, token: string }> {
        // Verificar si el correo ya está registrado
        if (await this.profileModel.exists({ email: profile.email })) {
          throw new NotFoundException('El correo ya está registrado');
        }
    
        // Crear el nuevo perfil
        const newProfile = new this.profileModel(profile);
    
        // Guardar el perfil en la base de datos
        const savedProfile = await newProfile.save();
    
        // Crear el token con la información del perfil
        const payload = { email: savedProfile.email, sub: savedProfile._id }; // El payload puede contener el ID y el email del perfil
        const token = this.jwtAuthGuard.createToken(payload);  // Usamos el método del guard para generar el token
    
        // Retornar tanto el perfil como el token
        return { profile: savedProfile, token };
      }

    // Metodo para actualizar un perfil y obtner el token del header para verificar la autenticacion
    async updateProfile(email: string, updateProfileDto: UpdateProfileDTO): Promise<ProfileDTO> {
        const updatedProfile = await this.profileModel.findOneAndUpdate(
            { email }, // Buscando el perfil basado en el email
            updateProfileDto, // Actualizando el perfil
            { new: true }, // Retornando el perfil actualizado
        ).exec(); // Actualizando el perfil en la base de datos
        if (!updatedProfile) {
            throw new NotFoundException('Perfil no encontrado'); // Si no se encuentra el perfil, se lanza una excepcion
        }
        return updatedProfile; // Se retorna el perfil actualizado
    }

    // Metodo para eliminar un perfil
    async deleteProfile(email: string): Promise<ProfileDTO> {
        const deletedProfile = await this.profileModel.findOneAndDelete({
            email, // Buscando el perfil basado en el email
        }).exec(); // Eliminando el perfil de la base de datos
        if (!deletedProfile) {
            throw new NotFoundException('Perfil no encontrado'); // Si no se encuentra el perfil, se lanza una excepcion
        }
        return deletedProfile; // Se retorna el perfil eliminado
    }
}