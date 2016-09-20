'use strict';

describe('Asistentes E2E Tests:', function () {
  describe('Test Asistentes page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/asistentes');
      expect(element.all(by.repeater('asistente in asistentes')).count()).toEqual(0);
    });
  });
});
