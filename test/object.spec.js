var expect = require('chai').expect;

import {
  pick,
  assign,
  merge
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


  describe('merge', function() {

    it('should merge recursively', function() {

      // given
      var obj = {
        a: {
          a: 'A',
          c: {
            d: [ 0, 1, 2 ]
          }
        },
        b: false
      };

      var other = {
        a: {
          c: {
            e: 'E',
            // overrides obj.a.c.d
            d: [ 5, 6, 7 ]
          }
        },
        // overridden by other2
        b: 'foo'
      };

      var other2 = {
        a: {
          a: 'A2'
        },
        b: {
          c: undefined
        }
      };

      // when
      var result = merge(obj, other, null, other2);

      // then
      expect(result).to.equal(obj);

      expect(result).to.eql({
        a: {
          a: 'A2',
          c: {
            e: 'E',
            d: [ 5, 6, 7 ]
          }
        },
        b: {
          c: undefined
        }
      });

    });

  });

});