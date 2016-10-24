'use strict';

describe('Reportes E2E Tests:', function () {
  describe('Test Reportes page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/reportes');
      expect(element.all(by.repeater('reporte in reportes')).count()).toEqual(0);
    });
  });
});
