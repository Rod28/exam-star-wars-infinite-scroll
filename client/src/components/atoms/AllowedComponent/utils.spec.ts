import { isAllowed } from './utils';

describe('Todos los test para  la funcion isAllowed()', () => {
  describe('Casos donde se regresa el valor true', () => {
    it('Regresa true, tiene acceso a la ruta actual', () => {
      expect(isAllowed('/', [], ['/'])).toBeTruthy();
    });

    it('Regresa true, no esta restringida la ruta', () => {
      expect(isAllowed('/', ['/my-favorites'], [])).toBeTruthy();
    });

    it('Regresa true, tiene una ruta permitida', () => {
      expect(isAllowed('/my-favorites', [], ['/my-favorites'])).toBeTruthy();
    });
  });

  describe('Casos donde se regresa el valor false', () => {
    it('Regresa false, la ruta actual es vacia', () => {
      expect(isAllowed('' as any, [], ['/'])).toBeFalsy();
    });

    it('Regresa false, no tiene acceso a la ruta actual', () => {
      expect(isAllowed('/my-favorites', [], ['/'])).toBeFalsy();
    });

    it('Regresa false, esta restringida la ruta', () => {
      expect(
        isAllowed('/my-favorites', ['/my-favorites', '/my-information'], [])
      ).toBeFalsy();
    });

    it('Regresa false, la ruta actual no pertenece a las rutas permitidas', () => {
      expect(isAllowed('/', [], ['/my-favorites'])).toBeFalsy();
    });
  });
});
