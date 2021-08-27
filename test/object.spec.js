var expect = require('chai').expect;

import {
  pick,
  assign,
  merge,
  omit,
  set,
  get
} from '../lib/object';


describe('object', function() {

  describe('pick', function() {

    it('should take selected attributes', function() {

      // given
      let obj = {
        a: 1,
        b: false,
        c: null,
        e: undefined
      };

      // when
      let picked = pick(obj, [ 'a', 'c', 'd', 'e' ]);

      // then
      expect(picked).to.eql({
        a: 1,
        c: null,
        e: undefined
      });

    });


    it('should handle computed and non-enumerable properties', function() {

      // given
      let obj = {};

      Object.defineProperty(obj, 'a', { value: 1 });
      Object.defineProperty(obj, 'b', { get: () => false });
      Object.defineProperty(obj, 'c', { get: () => null });
      Object.defineProperty(obj, 'e', { value: undefined });

      // when
      let picked = pick(obj, [ 'a', 'c', 'd', 'e' ]);

      // then
      expect(picked).to.eql({
        a: 1,
        c: null,
        e: undefined
      });

    });


    it('should pick inherited properties', function() {

      // given
      let proto = { a: 1 };
      let obj = Object.create(proto);


      // when
      let picked = pick(obj, [ 'a' ]);

      // then
      expect(picked).to.eql({
        a: 1
      });

    });

  });


  describe('omit', function() {

    it('should omit selected attributes', function() {

      // given
      let obj = {
        a: 1,
        b: false,
        c: null,
        e: undefined
      };

      // when
      let omitted = omit(obj, [ 'a', 'd', 'e' ]);

      // then
      expect(omitted).to.eql({
        b: false,
        c: null
      });

    });


    it('should ignore non-enumerable properties', function() {

      // given
      let obj = {};

      Object.defineProperty(obj, 'b', { enumerable: true, get: () => false });
      Object.defineProperty(obj, 'c', { get: () => null });

      // when
      let omited = omit(obj, [ 'a', 'd', 'e' ]);

      // then
      expect(omited).to.eql({
        b: false
      });

    });

  });


  describe('assign', function() {

    it('should merge objects', function() {

      // given
      let obj1 = {
        a: 1,
        b: false,
        c: null
      };

      let obj2 = {
        a: false,
        d: undefined
      };

      // when
      let result = assign({}, obj1, obj2, null);

      // then
      expect(result).to.eql({
        a: false,
        b: false,
        c: null,
        d: undefined
      });

    });


    it('should handle null objects', function() {

      // when
      const result = assign({ bar: 'Bar' }, null, undefined, false, 0, { foo: 'Foo' });

      // then
      expect(result).to.exist;
    });


    it('should not override prototype', function() {

      function Bar() {}
      function Foo() {}

      // given
      let obj1 = new Foo();

      let obj2 = new Bar();

      // when
      let result = assign(obj1, obj2);

      // then
      expect(result).to.eql(obj1);

      expect(result.__proto__).to.eql(obj1.__proto__);
    });


    it('should not allow prototype pollution', function() {

      // given
      let target = { merge: { me: 'nested' } };
      let source = JSON.parse('{ "__proto__": { "alert": 1 } }');

      // when
      assign(target, source);

      // then
      expect({}.alert).to.be.undefined;
    });

  });


  describe('merge', function() {

    it('should merge recursively', function() {

      // given
      let obj = {
        a: {
          a: 'A',
          c: {
            d: [ 0, 1, 2 ]
          }
        },
        b: false
      };

      let other = {
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

      let other2 = {
        a: {
          a: 'A2'
        },
        b: {
          c: undefined
        }
      };

      // when
      let result = merge(obj, other, null, other2);

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
      let obj1 = new Foo();

      let obj2 = new Bar();

      // when
      let result = merge(obj1, obj2);

      // then
      expect(result).to.eql(obj1);

      expect(result.__proto__).to.eql(obj1.__proto__);
    });


    it('should not allow prototype pollution', function() {

      // given
      let target = { merge: { me: 'nested' } };
      let source = JSON.parse('{ "__proto__": { "alert": 1 } }');

      // when
      merge(target, source);

      // then
      expect({}.alert).to.be.undefined;
    });

  });


  describe('set', function() {

    it('should return modified object', function() {

      // given
      let x = {};

      // when
      let modified = set(x, ['a'], true);

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


  describe('get', function() {

    it('should return object property', function() {
      expect(get({}, ['a'])).to.equal(undefined);
      expect(get({}, ['a'], 'FOO')).to.equal('FOO');

      expect(get({ a: 0 }, ['a'])).to.equal(0);
      expect(get({ a: 0 }, ['a'], 1)).to.equal(0);

      expect(get({ a: { b: 0 } }, ['a', 'b'])).to.equal(0);
      expect(get({ a: { } }, ['a', 'b'], 1)).to.equal(1);

      expect(get(null, ['a'])).to.equal(undefined);
      expect(get(null, ['a'], 1)).to.equal(1);

      expect(get({ a: null }, ['a'])).to.equal(null);
      expect(get({ a: null }, ['a', 'b'])).to.equal(undefined);
      expect(get({ a: null }, ['a', 'b'], 1)).to.equal(1);
    });


    it('should return array property', function() {
      expect(get([], [0])).to.equal(undefined);
      expect(get([], ['0'])).to.equal(undefined);
      expect(get([], [0], 'FOO')).to.equal('FOO');

      expect(get([[0, 1, 2]], [0, 1])).to.equal(1);
      expect(get([[0, 1, 2]], [0, 3])).to.equal(undefined);
      expect(get([[0, 1, 2]], [0, 3], 'FOO')).to.equal('FOO');

      expect(get(null, [0])).to.equal(undefined);
      expect(get([null], [0])).to.equal(null);
      expect(get([null], [0, 3])).to.equal(undefined);
      expect(get([null], [0, 3], 1)).to.equal(1);
    });

  });

});