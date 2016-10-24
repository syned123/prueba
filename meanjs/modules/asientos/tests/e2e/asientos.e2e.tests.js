'use strict';

describe('Asientos E2E Tests:', function () {
  describe('Test Asientos page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/asientos');
      expect(element.all(by.repeater('asiento in asientos')).count()).toEqual(0);
    });
  });
});
