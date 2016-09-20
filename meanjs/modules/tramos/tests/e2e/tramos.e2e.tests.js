'use strict';

describe('Tramos E2E Tests:', function () {
  describe('Test Tramos page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/tramos');
      expect(element.all(by.repeater('tramo in tramos')).count()).toEqual(0);
    });
  });
});
