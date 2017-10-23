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
        c: null,
        e: undefined
      };

      // when
      var picked = pick(obj, [ 'a', 'c', 'd', 'e' ]);

      // then
      expect(picked).to.eql({
        a: 1,
        c: null,
        e: undefined
      });

    });


    it('should pick computed and non-enumerable properties', function() {

      // given
      var obj = {};

      Object.defineProperty(obj, 'a', { value: 1 });
      Object.defineProperty(obj, 'b', { get: () => false });
      Object.defineProperty(obj, 'c', { get: () => null });
      Object.defineProperty(obj, 'e', { value: undefined });

      // when
      var picked = pick(obj, [ 'a', 'c', 'd', 'e' ]);

      // then
      expect(picked).to.eql({
        a: 1,
        c: null,
        e: undefined
      });

    });


    it('should pick inherited properties', function() {

      // given
      var proto = { a: 1 };
      var obj = Object.create(proto);


      // when
      var picked = pick(obj, [ 'a' ]);

      // then
      expect(picked).to.eql({
        a: 1
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