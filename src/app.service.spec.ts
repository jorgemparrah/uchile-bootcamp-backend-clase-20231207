import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [ AppService ],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('login', () => {
    it('Usuario no encontrado', () => {
      const usuario = 'admin3';
      const clave = '1234';
      const resultado = () => {
        appService.login(usuario, clave);
      }
      expect(resultado).toThrow('El usuario no existe')
    });

    it('Usuario con contraseña incorrecta', () => {
      const usuario = 'admin2';
      const clave = '1234';
      const resultado = () => {
        appService.login(usuario, clave);
      }
      expect(resultado).toThrow('La contraseña es incorrecta')
    });

    it('Usuario con contraseña correcta', () => {
      const usuario = 'admin';
      const clave = '1234';
      const resultado = appService.login(usuario, clave);
      expect(resultado).not.toBeNull();
      expect(resultado).not.toBeUndefined();
      expect(resultado.nombre).toBe(usuario);
      expect(resultado.jwt).not.toBeNull();
      expect(resultado.jwt).not.toBeUndefined();
      expect(resultado.jwt).toEqual('token');
      expect(resultado.perfiles).toContain('ADMIN');
      expect(resultado.mensaje).toEqual("OK");
    });
  });

});
