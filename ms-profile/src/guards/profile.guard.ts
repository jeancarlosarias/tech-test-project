import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate( // Metodo para verificar si el usuario esta autenticado
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest(); // Obtiene la solicitud
    const token = this.extractTokenFromHeader(request); // Extrae el token del encabezado

    if (!token) {
      return false; // Si no hay token, retorna falso
    }

    try {
      // Verifica el token y extrae el payload
      const decoded = this.jwtService.verify(token);
      request.user = decoded;  // Asigna el usuario decodificado a la solicitud
      return true;
    } catch (error) {
      return false;
    }
  }

  // Metodo para extraer el token del encabezado de la solicitud
  private extractTokenFromHeader(request: any): string | null {
    const token = request.headers['authorization']; // Obtiene el token del encabezado
    if (!token) {
      return null; // Si no hay token, retorna nulo
    }
    return token.replace('Bearer ', ''); // Retorna el token sin la palabra Bearer
  }
}
