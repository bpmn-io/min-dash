import {
  expect
} from 'chai';

import {
  flatten,
  find,
  bind,
  isArray,
  pick
} from 'min-dash';


describe('integration', function() {

  describe('bundle', function() {

    it('should expose array utils', function() {

      // then
      expect(flatten).to.exist;

    });


    it('should expose collection utils', function() {

      // then
      expect(find).to.exist;

    });


    it('should expose fn utils', function() {

      // then
      expect(bind).to.exist;

    });


    it('should expose lang utils', function() {

      // then
      expect(isArray).to.exist;

    });


    it('should expose object utils', function() {

      // then
      expect(pick).to.exist;

    });

  });

});