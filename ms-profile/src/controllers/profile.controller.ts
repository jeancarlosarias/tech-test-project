import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { JwtAuthGuard } from '../guards/profile.guard';
import { Profile } from '../schemas/profile.schema';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}  // Inyectamos el servicio

  @Get('/get-profile')
  @UseGuards(JwtAuthGuard) // Aseguramos que la ruta solo se pueda acceder con un token JWT valido
  async getProfile(@Request() req: any): Promise<Profile> {
    // `req.user` es el usuario que se extrae del JWT una vez que es validado
    return this.profileService.getProfileByEmail(req.user.email); // Llamamos al servicio para obtener el perfil
  }

  // Endpoint para obtener el perfil de una persona basado en el email
  @Get('/get-profile/:email')
  @UseGuards(JwtAuthGuard) // Aplicando el guard de autenticación
  @ApiResponse({ status: 200, description: 'Perfil encontrado', type: Profile })
  @ApiResponse({ status: 404, description: 'Perfil no encontrado' })
  async getProfileByEmail(@Param('email') email: string): Promise<Profile> {
    return this.profileService.getProfileByEmail(email); // Llamando al servicio para obtener el perfil
  }
}