var expect = require('chai').expect;

import {
  has
} from '../lib/lang';


describe('lang', function() {

  describe('has', function() {

    it('should work for {}', function() {

      // given
      var obj = {
        a: 1,
        e: undefined
      };

      Object.defineProperty(obj, 'b', { value: 1 });

      // then
      expect(has(obj, 'a')).to.be.true;
      expect(has(obj, 'b')).to.be.true;
      expect(has(obj, 'e')).to.be.true;

      expect(has(obj, 'c')).to.be.false;
    });


    it('should work for []', function() {

      // given
      var arr = [ 1, 2, 3 ];

      // then
      expect(has(arr, '1')).to.be.true;
      expect(has(arr, '5')).to.be.false;
    });

  });

});