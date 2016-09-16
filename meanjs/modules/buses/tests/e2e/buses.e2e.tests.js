'use strict';

describe('Buses E2E Tests:', function () {
  describe('Test Buses page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/buses');
      expect(element.all(by.repeater('bus in buses')).count()).toEqual(0);
    });
  });
});
