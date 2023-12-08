import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{
        provide: AppService,
        useValue: {
          login: jest.fn().mockReturnValue({
            mensaje: 'OK',
            perfiles: [ "ADMIN", "VENDEDOR" ],
            jwt: 'token',
            nombre: 'admin'
          })
        }
      }],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('login', () => {
    it('Usuario correcto', () => {
      const usuario = 'admin';
      const clave = '1234';
      const resultado = appController.login(usuario, clave);
      expect(resultado).not.toBeNull();
      expect(resultado).not.toBeUndefined();
      expect(resultado.nombre).toBe(usuario);
      expect(resultado.jwt).not.toBeNull();
      expect(resultado.jwt).not.toBeUndefined();
      expect(resultado.jwt).toEqual('token');
      expect(resultado.perfiles).toContain('ADMIN');
    });

    it('Usuario no autorizado', () => {
      const usuario = 'admin';
      const clave = '1234';
      jest.spyOn(appService, 'login').mockImplementation((usuario, clave) => {
        throw new Error('Mensaje de Prueba');
      })
      const resultado = () => {
        appController.login(usuario, clave);
      }
      expect(resultado).toThrow('Mensaje de Prueba');
      expect(resultado).toThrow(UnauthorizedException);
    });

    it('Usuario no existe', () => {
      const usuario = 'admin';
      const clave = '1234';
      jest.spyOn(appService, 'login').mockImplementation((usuario, clave) => {
        throw new Error('El usuario no existe');
      })
      const resultado = () => {
        appController.login(usuario, clave);
      }
      expect(resultado).toThrow('El usuario no existe');
      expect(resultado).toThrow(ForbiddenException);
    });
  });

});
