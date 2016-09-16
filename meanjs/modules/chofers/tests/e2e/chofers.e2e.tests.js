'use strict';

describe('Chofers E2E Tests:', function () {
  describe('Test Chofers page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/chofers');
      expect(element.all(by.repeater('chofer in chofers')).count()).toEqual(0);
    });
  });
});
