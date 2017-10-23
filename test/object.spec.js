var expect = require('chai').expect;

import {
  pick,
  assign
} from '../lib/object';


describe('object', function() {

  describe('pick', function() {

    it('should take selected attributes', function() {

      // given
      var obj = {
        a: 1,
        b: false,
        c: null
      };

      // when
      var picked = pick(obj, [ 'a', 'c', 'd' ]);

      // then
      expect(picked).to.eql({
        a: 1,
        c: null,
        d: undefined
      });

    });


    it('should work on computed and non-enumerable properties', function() {

      // given
      var obj = {};

      Object.defineProperty(obj, 'a', { value: 1 });
      Object.defineProperty(obj, 'b', { get: () => false });
      Object.defineProperty(obj, 'c', { get: () => null });

      // when
      var picked = pick(obj, [ 'a', 'c', 'd' ]);

      // then
      expect(picked).to.eql({
        a: 1,
        c: null,
        d: undefined
      });

    });

  });


  describe('assign', function() {

    it('should merge objects', function() {

      // given
      var obj1 = {
        a: 1,
        b: false,
        c: null
      };

      var obj2 = {
        a: false,
        d: undefined
      };

      // when
      var result = assign({}, obj1, obj2, null);

      // then
      expect(result).to.eql({
        a: false,
        b: false,
        c: null,
        d: undefined
      });

    });

  });

});