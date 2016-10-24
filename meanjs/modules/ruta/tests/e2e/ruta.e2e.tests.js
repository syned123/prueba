'use strict';

describe('Ruta E2E Tests:', function () {
  describe('Test Ruta page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/ruta');
      expect(element.all(by.repeater('rutum in ruta')).count()).toEqual(0);
    });
  });
});
