import { Controller, UseGuards, Request, Post, Delete, Body, Put, Param } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { JwtAuthGuard } from '../guards/profile.guard';
import { Profile } from '../schemas/profile.schema';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}  // Inyectamos el servicio

  // metodo para crear un perfil
    @Post('create-profile')
    @ApiResponse({ status: 201, description: 'Perfil creado' })
    @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    async createProfile(@Body() profile: Profile): Promise<{ profile: Profile, token: string }> {
        return this.profileService.createProfile(profile); // Creamos un perfil
    }

    // metodo para eliminar un perfil y obtner el token del header para verificar la autenticacion
    @Delete('delete-profile/:email')
    @UseGuards(JwtAuthGuard) // Protegemos la ruta con el guard
    @ApiResponse({ status: 200, description: 'Perfil eliminado' })
    @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 404, description: 'No encontrado' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    async deleteProfile(@Param('email') email: string): Promise<Profile> {
        return this.profileService.deleteProfile(email); // Eliminamos un perfil
    }

    // metodo para actualizar un perfil
    @Put('update-profile')
    @UseGuards(JwtAuthGuard) // Protegemos la ruta con el guard
    @ApiResponse({ status: 200, description: 'Perfil actualizado' })
    @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 404, description: 'No encontrado' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    async updateProfile(@Request() req: any): Promise<Profile> {
        return this.profileService.updateProfile(req.body.email, req.body); // Actualizamos un perfil
    }
}