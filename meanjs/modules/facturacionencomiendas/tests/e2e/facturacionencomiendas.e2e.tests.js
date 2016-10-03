'use strict';

describe('Facturacionencomiendas E2E Tests:', function () {
  describe('Test Facturacionencomiendas page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/facturacionencomiendas');
      expect(element.all(by.repeater('facturacionencomienda in facturacionencomiendas')).count()).toEqual(0);
    });
  });
});
