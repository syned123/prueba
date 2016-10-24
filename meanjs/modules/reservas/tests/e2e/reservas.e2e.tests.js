'use strict';

describe('Reservas E2E Tests:', function () {
  describe('Test Reservas page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/reservas');
      expect(element.all(by.repeater('reserva in reservas')).count()).toEqual(0);
    });
  });
});
