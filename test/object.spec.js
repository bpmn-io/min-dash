const expect = require('chai').expect;

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
      const obj = {
        a: 1,
        b: false,
        c: null,
        e: undefined
      };

      // when
      const picked = pick(obj, [ 'a', 'c', 'd', 'e' ]);

      // then
      expect(picked).to.eql({
        a: 1,
        c: null,
        e: undefined
      });

    });


    it('should handle computed and non-enumerable properties', function() {

      // given
      const obj = {};

      Object.defineProperty(obj, 'a', { value: 1 });
      Object.defineProperty(obj, 'b', { get: () => false });
      Object.defineProperty(obj, 'c', { get: () => null });
      Object.defineProperty(obj, 'e', { value: undefined });

      // when
      const picked = pick(obj, [ 'a', 'c', 'd', 'e' ]);

      // then
      expect(picked).to.eql({
        a: 1,
        c: null,
        e: undefined
      });

    });


    it('should pick inherited properties', function() {

      // given
      const proto = { a: 1 };
      const obj = Object.create(proto);


      // when
      const picked = pick(obj, [ 'a' ]);

      // then
      expect(picked).to.eql({
        a: 1
      });

    });

  });


  describe('omit', function() {

    it('should omit selected attributes', function() {

      // given
      const obj = {
        a: 1,
        b: false,
        c: null,
        e: undefined
      };

      // when
      const omitted = omit(obj, [ 'a', 'd', 'e' ]);

      // then
      expect(omitted).to.eql({
        b: false,
        c: null
      });

    });


    it('should ignore non-enumerable properties', function() {

      // given
      const obj = {};

      Object.defineProperty(obj, 'b', { enumerable: true, get: () => false });
      Object.defineProperty(obj, 'c', { get: () => null });

      // when
      const omited = omit(obj, [ 'a', 'd', 'e' ]);

      // then
      expect(omited).to.eql({
        b: false
      });

    });

  });


  describe('assign', function() {

    it('should merge objects', function() {

      // given
      const obj1 = {
        a: 1,
        b: false,
        c: null
      };

      const obj2 = {
        a: false,
        d: undefined
      };

      // when
      const result = assign({}, obj1, obj2, null);

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
      const obj1 = new Foo();

      const obj2 = new Bar();

      // when
      const result = assign(obj1, obj2);

      // then
      expect(result).to.eql(obj1);

      expect(result.__proto__).to.eql(obj1.__proto__);
    });


    it('should not allow prototype pollution', function() {

      // given
      const target = { merge: { me: 'nested' } };
      const source = JSON.parse('{ "__proto__": { "alert": 1 } }');

      // when
      assign(target, source);

      // then
      expect({}.alert).to.be.undefined;
    });

  });


  describe('merge', function() {

    it('should merge recursively', function() {

      // given
      const obj = {
        a: {
          a: 'A',
          c: {
            d: [ 0, 1, 2 ]
          }
        },
        b: false
      };

      const other = {
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

      const other2 = {
        a: {
          a: 'A2'
        },
        b: {
          c: undefined
        }
      };

      // when
      const result = merge(obj, other, null, other2);

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
      const obj1 = new Foo();

      const obj2 = new Bar();

      // when
      const result = merge(obj1, obj2);

      // then
      expect(result).to.eql(obj1);

      expect(result.__proto__).to.eql(obj1.__proto__);
    });


    it('should not allow prototype pollution', function() {

      // given
      const target = { merge: { me: 'nested' } };
      const source = JSON.parse('{ "__proto__": { "alert": 1 } }');

      // when
      merge(target, source);

      // then
      expect({}.alert).to.be.undefined;
    });

  });


  describe('set', function() {

    it('should return modified object', function() {

      // given
      const x = {};

      // when
      const modified = set(x, ['a'], true);

      // then
      expect(modified).to.equal(x);
    });


    it('should set property value', function() {
      expect(set({}, ['a'], true)).to.eql({
        a: true
      });
    });


    it('should set array value', function() {

      expect(set([0, 1, 2], [1], 'A')).to.eql([ 0, 'A', 2]);

      expect(set({
        a: [0, 0]
      }, [ 'a', 1 ], 1)).to.eql({
        a: [ 0, 1 ]
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