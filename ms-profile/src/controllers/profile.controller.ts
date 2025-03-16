import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { JwtAuthGuard } from '../guards/profile.guard';
import { Profile } from '../schemas/profile.schema';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}  // Inyectamos el servicio

  // metodo para obtener el perfil de una persona
  @Get('/get-profile')
  @ApiResponse({ status: 200, description: 'Perfil encontrado', type: Profile }) // Documentacion de la API
  @ApiResponse({ status: 404, description: 'Perfil no encontrado' }) 
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
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
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async getProfileByEmail(@Param('email') email: string): Promise<Profile> {
    return this.profileService.getProfileByEmail(email); // Llamando al servicio para obtener el perfil
  }
}