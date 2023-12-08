import { Controller, ForbiddenException, Get, Param, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiParam } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("login/:usuario/:clave")
  @ApiParam({ name: 'usuario', type: String })
  @ApiParam({ name: 'clave', type: String })
  login(@Param("usuario") usuario: string, @Param("clave") clave: string): any {
    try {
      const respuesta = this.appService.login(usuario, clave);
      return respuesta;
    } catch (error) {
      if (error.message === 'El usuario no existe') {
        throw new ForbiddenException(error.message);
      }
      throw new UnauthorizedException(error.message);
    }
  }
}
