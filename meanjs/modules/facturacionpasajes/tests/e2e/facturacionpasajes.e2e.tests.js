'use strict';

describe('Facturacionpasajes E2E Tests:', function () {
  describe('Test Facturacionpasajes page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/facturacionpasajes');
      expect(element.all(by.repeater('facturacionpasaje in facturacionpasajes')).count()).toEqual(0);
    });
  });
});
