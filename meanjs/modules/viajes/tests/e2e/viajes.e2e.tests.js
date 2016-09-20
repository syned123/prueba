'use strict';

describe('Viajes E2E Tests:', function () {
  describe('Test Viajes page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/viajes');
      expect(element.all(by.repeater('viaje in viajes')).count()).toEqual(0);
    });
  });
});
