var expect = require('chai').expect;

import {
  find,
  findIndex,
  filter,
  forEach,
  without,
  reduce,
  every,
  some,
  map,
  values,
  keys,
  groupBy,
  uniqueBy,
  unionBy,
  size,
  sortBy,
  matchPattern
} from '../lib/collection';


describe('collection', function() {

  describe('find', function() {

    it('should work on Array', function() {

      // given
      var arr = [ 'A', 'B', 'C' ];

      // when
      var result = find(arr, (el) => el === 'B');
      var resultByIndex = find(arr, (el, idx) => idx === 2);

      // then
      expect(result).to.eql('B');
      expect(resultByIndex).to.eql('C');
    });


    it('should work on Object', function() {

      // given
      var obj = {
        foo: 'FOO',
        bar: 'BAR'
      };

      // when
      var result = find(obj, (el) => el === 'BAR');
      var resultByIndex = find(obj, (el, key) => key === 'foo');

      // then
      expect(result).to.eql('BAR');
      expect(resultByIndex).to.eql('FOO');
    });


    it('should be null-safe', function() {

      // when
      var result = find(null, (el) => el === 'BAR');

      // then
      expect(result).not.to.exist;
    });


    it('should strict equality check arg', function() {

      // given
      var arr = [ 0, '', null ];

      // when
      var result = find(arr, 0);

      // then
      expect(result).to.equal(0);
    });

  });


  describe('findIndex', function() {

    it('should work on Array', function() {

      // given
      var arr = [ 'A', 'B', 'C' ];

      // when
      var result = findIndex(arr, (el) => el === 'B');
      var resultByIndex = findIndex(arr, (el, idx) => idx === 2);

      // then
      expect(result).to.equal(1);
      expect(resultByIndex).to.equal(2);
    });


    it('should work on Object', function() {

      // given
      var obj = {
        foo: 'FOO',
        bar: 'BAR'
      };

      // when
      var result = findIndex(obj, (el) => el === 'BAR');
      var resultByIndex = findIndex(obj, (el, key) => key === 'foo');

      // then
      expect(result).to.eql('bar');
      expect(resultByIndex).to.eql('foo');
    });


    it('should be null-safe', function() {

      // when
      var result = findIndex(null, (el) => el === 'BAR');

      // then
      expect(result).to.be.undefined;
    });


    it('should strict equality check arg', function() {

      // given
      var obj = {
        a: 0,
        b: '',
        c: null
      };

      // when
      var result = findIndex(obj, null);

      // then
      expect(result).to.equal('c');
    });

  });


  describe('filter', function() {

    it('should work on Array', function() {

      // given
      var arr = [ 50, 200, 500 ];

      // when
      var result = filter(arr, (el) => el > 100);
      var resultByIndex = filter(arr, (el, idx) => idx < 2);

      // then
      expect(result).to.eql([ 200, 500 ]);
      expect(resultByIndex).to.eql([ 50, 200 ]);
    });


    it('should work on Object', function() {

      // given
      var obj = {
        a: 1,
        b: 2,
        c: 3
      };

      // when
      var result = filter(obj, (el) => el > 1);
      var resultByIndex = filter(obj, (el, key) => key !== 'b');

      // then
      expect(result).to.eql([ 2, 3 ]);
      expect(resultByIndex).to.eql([ 1, 3 ]);
    });


    it('should be null-safe', function() {

      // when
      var result = filter(null, (a) => a);

      // then
      expect(result).to.eql([]);
    });

  });


  describe('forEach', function() {

    it('should work on Array', function() {

      // given
      var arr = [ {}, {}, {} ];

      var called = 0;

      // when
      forEach(arr, function(el, idx) {

        called++;

        // then
        expect(arr[idx]).to.equal(el);
      });

      expect(called).to.eql(3);
    });


    it('should work on Object', function() {

      // given
      var obj = {
        a: {},
        b: {},
        c: {}
      };

      var called = 0;

      // when
      forEach(obj, function(el, key) {

        called++;

        // then
        expect(obj[key]).to.equal(el);
      });

      expect(called).to.eql(3);
    });


    it('should break on returning <false>', function() {

      // given
      var arr = [ 1, 2, 3 ];

      var called = 0;

      // when
      forEach(arr, function(el, idx) {

        called++;

        if (el === 2) {
          return false;
        }
      });

      expect(called).to.eql(2);
    });


    it('should be null-safe', function() {

      expect(function() {
        forEach(null, function() { });
      }).not.to.throw;

    });


    it('should return the result that stopped the iteration', function() {

      // given
      var arr = [ 1, 2, 3 ];

      var result;

      // when
      result = forEach(arr, function(el) {

        if (el === 2) {
          return false;
        }
      });

      expect(result).to.eql(2);

    });

  });


  describe('without', function() {

    it('should work on Array', function() {
      // given
      var obj = { };
      var arr = [ 1, obj, false ];

      // when
      var filtered = without(arr, obj);
      var filteredByMatcher = without(arr, (e) => e);
      var filteredByIndex = without(arr, (e, idx) => idx === 2);

      // then
      expect(filtered).to.eql([ 1, false ]);
      expect(filteredByMatcher).to.eql([ false ]);
      expect(filteredByIndex).to.eql([ 1, obj ]);
    });


    it('should not work on Object', function() {

      expect(function() {
        without({}, 1);
      }).to.throw;

    });

  });


  describe('reduce', function() {

    it('should work on Array', function() {

      // given
      var arr = [ 4, 4, 4 ];

      // when
      var result = reduce(arr, (a, val) => a + val, 0);

      // then
      expect(result).to.eql(12);
    });


    it('should work on Object', function() {

      // given
      var obj = {
        a: 1,
        b: 2,
        c: 3
      };

      // when
      var result = reduce(obj, (a, val) => a + val, 0);

      // then
      expect(result).to.eql(6);
    });


    it('should be null-safe', function() {

      expect(function() {
        var result = reduce(null, (a, val) => a + val, 0);

        expect(result).to.equal(0);
      }).not.to.throw;

    });

  });


  describe('every', function() {

    it('should work on Array', function() {

      // given
      var arr = [ 4, 4, 4 ];

      // when
      var result = every(arr, (val) => val === 4);
      var resultByIndex = every(arr, (val, idx) => idx < 2);

      // then
      expect(result).to.be.true;
      expect(resultByIndex).to.be.false;
    });


    it('should work on Object', function() {

      // given
      var obj = {
        a: 4,
        b: 4,
        c: 4
      };

      // when
      var result = every(obj, (val) => val === 4);
      var resultByIndex = every(obj, (val, key) => key !== 'c');

      // then
      expect(result).to.be.true;
      expect(resultByIndex).to.be.false;
    });


    it('should be null-safe', function() {

      expect(every(null, () => false)).to.be.true;

    });


    it('should always return boolean', function() {

      // given
      var collection = [ 1, true, 'word' ];

      // when
      var result = every(collection, val => val);

      // then
      expect(result).to.be.true;
    });

  });


  describe('some', function() {

    it('should work on Array', function() {

      // given
      var arr = [ 1, 2, 3 ];

      // when
      var resultTrue = some(arr, (val) => val === 3);
      var resultFalse = some(arr, (val) => val === false);

      var resultByIndex = some(arr, (val, idx) => idx === 4);

      // then
      expect(resultTrue).to.be.true;
      expect(resultFalse).to.be.false;

      expect(resultByIndex).to.be.false;
    });


    it('should work on Object', function() {

      // given
      var obj = {
        a: 1,
        b: 2,
        c: 3
      };

      // when
      var resultTrue = some(obj, (val) => val === 3);
      var resultFalse = some(obj, (val) => val === false);

      var resultByIndex = some(obj, (val, key) => key === 'blub');

      // then
      expect(resultTrue).to.be.true;
      expect(resultFalse).to.be.false;

      expect(resultByIndex).to.be.false;
    });


    it('should be null-safe', function() {

      expect(some(null, () => false)).to.be.false;

    });

  });


  describe('map', function() {

    it('should work on Array', function() {

      // given
      var arr = [ 1, 2, 3];

      // when
      var result = map(arr, (val) => val + 3);

      // then
      expect(result).to.eql([ 4, 5, 6 ]);
    });


    it('should work on Object', function() {

      // given
      var obj = {
        a: 1,
        b: 2,
        c: 3
      };

      // when
      var result = map(obj, (val) => val + 3);

      // then
      expect(result).to.eql([ 4, 5, 6 ]);

    });


    it('should be null-safe', function() {

      expect(map(undefined, () => false)).to.eql([]);

    });

  });


  describe('values', function() {

    it('should work on Array', function() {

      expect(values([ 1, 2, 3 ])).to.eql([ 1, 2, 3 ]);

    });


    it('should work on Object', function() {

      expect(values({ a: 'A', b: 'B' })).to.eql([ 'A', 'B']);

    });


    it('should be null-safe', function() {

      expect(values(undefined)).to.eql([]);

    });

  });


  describe('keys', function() {

    it('should work on Array', function() {

      expect(keys([ 1, 2, 3 ])).to.eql([ '0', '1', '2' ]);

    });


    it('should work on Object', function() {

      expect(keys({ a: 'A', b: 'B' })).to.eql([ 'a', 'b']);

    });


    it('should be null-safe', function() {

      expect(keys(undefined)).to.eql([]);

    });

  });


  describe('groupBy', function() {

    it('should work on Array', function() {

      // given
      var arr = [
        { a: '1' },
        { a: '2', b: '1' },
        { a: '2', b: '2' },
        { a: '3' }
      ];

      // when
      var groupedByAttr = groupBy(arr, 'a');
      var groupedByFn = groupBy(arr, (el) => el.b);

      // then
      expect(groupedByAttr).to.eql({
        '1': [ { a: '1' } ],
        '2': [ { a: '2', b: '1' }, { a: '2', b: '2' } ],
        '3': [ { a: '3' } ]
      });

      expect(groupedByFn).to.eql({
        '_': [ { a: '1' }, { a: '3' } ],
        '1': [ { a: '2', b: '1' } ],
        '2': [ { a: '2', b: '2' } ]
      });

    });


    it('should work on Object');


    it('should use supplied group', function() {

      // given
      var group = { '1': [ 2 ] };

      var arr = [
        { a: '1' }
      ];

      // when
      var groupedByAttr = groupBy(arr, 'a', group);

      // then
      expect(groupedByAttr).to.eql({
        '1': [ 2, { a: '1' } ]
      });

    });

  });


  describe('uniqueBy', function() {

    it('should process by attribute', function() {

      // given
      var arr = [
        { a: 1 },
        { a: 2 }
      ];

      var arr2 = [
        { a: 1 },
        { a: 3 }
      ];

      var arr3 = [
        { a: 2 }
      ];

      // when
      var unique = uniqueBy('a', arr, arr2, arr3);

      // then
      expect(unique[0]).to.equal(arr[0]);
      expect(unique[1]).to.equal(arr[1]);
      expect(unique[2]).to.equal(arr2[1]);

      expect(unique).to.have.length(3);

    });


    it('should process by discriminator fn');

  });


  describe('unionBy', function() {

    it('should === uniqueBy', function() {
      expect(uniqueBy).to.equal(unionBy);
    });

  });


  describe('sortBy', function() {


    it('should process by attribute', function() {

      // given
      var arr = [
        { a: 1 },
        { a: 2 },
        { a: 1 },
        { a: 3 },
        { a: 2 }
      ];

      // when
      var sorted = sortBy(arr, 'a');

      // then
      expect(sorted[0]).to.equal(arr[0]);
      expect(sorted[1]).to.equal(arr[2]);
      expect(sorted[2]).to.equal(arr[1]);
      expect(sorted[3]).to.equal(arr[4]);
      expect(sorted[4]).to.equal(arr[3]);

      expect(sorted).to.have.length(5);
    });


    it('should process by discriminator fn', function() {

      // given
      var arr = [
        { a: 1 },
        { a: 2 },
        { a: 1 },
        { a: 3 },
        { a: 2 }
      ];

      // when
      var sorted = sortBy(arr, (e) => e.a * -1);

      // then
      expect(sorted[0]).to.equal(arr[3]);
      expect(sorted[1]).to.equal(arr[1]);
      expect(sorted[2]).to.equal(arr[4]);
      expect(sorted[3]).to.equal(arr[0]);
      expect(sorted[4]).to.equal(arr[2]);

      expect(sorted).to.have.length(5);
    });

  });


  describe('matchPattern', function() {

    it('should strictly equal { key: value }', function() {

      // when
      var matcher = matchPattern({ a: 1 });

      // then
      expect(matcher({ a: 1, b: 10 })).to.be.true;
      expect(matcher({ a: 3, b: 10 })).to.be.false;
      expect(matcher({ a: true, b: 10 })).to.be.false;
    });

  });


  describe('size', function() {

    it('should return # of keys for Array', function() {

      // given
      var arr = [ 1, 2, 3 ];

      // then
      expect(size(arr)).to.eql(3);
    });


    it('should return # of keys for Object', function() {

      // given
      var obj = {
        a: 1,
        b: true,
        c: undefined
      };

      // then
      expect(size(obj)).to.eql(3);
    });

  });

});