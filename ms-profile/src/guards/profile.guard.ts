import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
 
  // Metodo para verificar si el token 
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest(); // Obtener la solicitud HTTP
    const token = this.extractTokenFromHeader(request); // Extraer el token del encabezado
  
    if (!token) {
      throw new UnauthorizedException('Token no proporcionado'); // Si no hay token, lanzar una excepcion
    }
  
    try {
      const decoded = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET }); // Verificar el token
      request.user = decoded; // Agregar el payload a la solicitud
      return true;
    } catch (error) {
      throw new ForbiddenException('Token invalido o expirado'); // Si el token es invalido o ha expirado, lanzar una excepcion
    }
  }

  // Metodo para extraer el token del encabezado de la solicitud
  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers['authorization']; // Obtiene el encabezado de autorizacion
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null; // Si no hay encabezado o no comienza con 'Bearer' retorna null
    const token = authHeader.split(' ')[1]; // Retorna el token
    return token;
}

  // Metodo para crear un token JWT
  createToken(payload: any): string {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET debe ser definido');
    }
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,  // Usar el JWT_SECRET de las variables de entorno
      expiresIn: '1h',  // Expiracion opcional
    });
  }
}
