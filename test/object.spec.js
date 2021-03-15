var expect = require('chai').expect;

import {
  pick,
  assign,
  merge,
  omit,
  set
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


    it('should handle computed and non-enumerable properties', function() {

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


  describe('omit', function() {

    it('should omit selected attributes', function() {

      // given
      var obj = {
        a: 1,
        b: false,
        c: null,
        e: undefined
      };

      // when
      var omitted = omit(obj, [ 'a', 'd', 'e' ]);

      // then
      expect(omitted).to.eql({
        b: false,
        c: null
      });

    });


    it('should ignore non-enumerable properties', function() {

      // given
      var obj = {};

      Object.defineProperty(obj, 'b', { enumerable: true, get: () => false });
      Object.defineProperty(obj, 'c', { get: () => null });

      // when
      var omited = omit(obj, [ 'a', 'd', 'e' ]);

      // then
      expect(omited).to.eql({
        b: false
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


    it('should not override prototype', function() {

      function Bar() {}
      function Foo() {}

      // given
      var obj1 = new Foo();

      var obj2 = new Bar();

      // when
      var result = assign(obj1, obj2);

      // then
      expect(result).to.eql(obj1);

      expect(result.__proto__).to.eql(obj1.__proto__);
    });


    it('should not allow prototype pollution', function() {

      // given
      var target = { merge: { me: 'nested' } };
      var source = JSON.parse('{ "__proto__": { "alert": 1 } }');

      // when
      assign(target, source);

      // then
      expect({}.alert).to.be.undefined;
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


    it('should not override prototype', function() {

      function Bar() {}
      function Foo() {}

      // given
      var obj1 = new Foo();

      var obj2 = new Bar();

      // when
      var result = merge(obj1, obj2);

      // then
      expect(result).to.eql(obj1);

      expect(result.__proto__).to.eql(obj1.__proto__);
    });


    it('should not allow prototype pollution', function() {

      // given
      var target = { merge: { me: 'nested' } };
      var source = JSON.parse('{ "__proto__": { "alert": 1 } }');

      // when
      merge(target, source);

      // then
      expect({}.alert).to.be.undefined;
    });

  });


  describe('set', function() {

    it('should return modified object', function() {

      // given
      var x = {};

      // when
      var modified = set(x, ['a'], true);

      // then
      expect(modified).to.equal(x);
    });


    it('should set property value', function() {
      expect(set({}, ['a'], true)).to.eql({
        a: true
      });

      expect(set({}, [''], 'A')).to.eql({
        '': 'A'
      });

      expect(set({}, [ 0 ], 'A')).to.eql({
        '0': 'A'
      });
    });


    it('should set array value', function() {

      expect(set([0, 1, 2], [1], 'A')).to.eql([ 0, 'A', 2]);

      expect(set([0, 1, 2], [1], 0)).to.eql([ 0, 0, 2]);

      expect(set({
        a: [0, 0]
      }, [ 'a', 1 ], 1)).to.eql({
        a: [ 0, 1 ]
      });

      expect(
        set({
          a: [
            { b: 'FOO' }
          ]
        }, [ 'a', 0, 'b' ], 'BAR')
      ).to.eql({
        a: [
          { b: 'BAR' }
        ]
      });
    });


    it('should set array with string keys', function() {

      expect(set([0, 1, 2], ['1'], 'A')).to.eql([ 0, 'A', 2]);

      expect(set({
        a: [0, 0]
      }, [ 'a', '1' ], 1)).to.eql({
        a: [ 0, 1 ]
      });
    });


    it('should delete value', function() {
      expect(set({
        a: false
      }, [ 'a' ], undefined)).to.eql({});

      expect(set({
        '': false
      }, [ '' ], undefined)).to.eql({});
    });


    it('should set nested value', function() {

      expect(set({
        a: {
          b: { }
        }
      }, ['a', 'b'], false)).to.eql({
        a: {
          b: false
        }
      });

      expect(set({
        a: {
          b: { }
        }
      }, [ 'a', 'b', 'c' ], 'C')).to.eql({
        a: {
          b: {
            c: 'C'
          }
        }
      });
    });


    it('should scaffold object hierarchy', function() {

      expect(set({}, [ 'a', 'b', 'c' ], 'C')).to.eql({
        a: {
          b: {
            c: 'C'
          }
        }
      });

      expect(
        set({ a: null }, [ 'a', 'b', 'c' ], 'C')
      ).to.eql({
        a: {
          b: {
            c: 'C'
          }
        }
      });
    });


    it('should scaffold array hierarchy', function() {

      expect(set({}, [ 'a', 1, 2 ], 'C')).to.eql({
        a: [
          undefined,
          [ undefined, undefined, 'C' ]
        ]
      });

      expect(set({}, [ 'a', '1', '2' ], 'C')).to.eql({
        a: [
          undefined,
          [ undefined, undefined, 'C' ]
        ]
      });
    });


    it('should not allow prototype polution', function() {
      expect(function() {
        set({}, [ '__proto__' ], { foo: 'bar' });
      }).to.throw(/illegal key/);
    });

  });

});