import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  USUARIOS = [{
    "usuario": "admin",
    "clave": "1234",
    "perfiles": [ "ADMIN" ]
  },{
    "usuario": "admin2",
    "clave": "12345",
    "perfiles": [ "ADMIN", "VENDEDOR" ]
  }];

  login(usuario: string, clave: string): any {
    const usuarioEncontrado = this.USUARIOS.find((usuarioItem) => {
      return usuarioItem.usuario === usuario;
    });
    if (!usuarioEncontrado) {
      throw new Error('El usuario no existe');
    }
    if (usuarioEncontrado.clave !== clave) {
      throw new Error('La contraseña es incorrecta');
    }
    const respuesta = {
      mensaje: 'OK',
      perfiles: usuarioEncontrado.perfiles,
      jwt: 'token',
      nombre: usuario
    };
    return respuesta;
  }
}
