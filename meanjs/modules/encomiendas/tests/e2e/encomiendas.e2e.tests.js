'use strict';

describe('Encomiendas E2E Tests:', function () {
  describe('Test Encomiendas page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/encomiendas');
      expect(element.all(by.repeater('encomienda in encomiendas')).count()).toEqual(0);
    });
  });
});
