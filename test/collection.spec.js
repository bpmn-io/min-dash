var expect = require('chai').expect;

import {
  find,
  filter,
  forEach,
  without,
  createMatcher
} from '../lib/collection';


describe('collection', function() {

  it('find', function() {

    // given
    var arr = [ 'A', 'B', 'C' ];

    // when
    var result = find(arr, (el) => el === 'B');
    var resultByIndex = find(arr, (el, idx) => idx === 2);

    // then
    expect(result).to.eql('B');
    expect(resultByIndex).to.eql('C');
  });


  it('filter', function() {

    // given
    var arr = [ 50, 200, 500 ];

    // when
    var result = filter(arr, (el) => el < 100);
    var resultByIndex = filter(arr, (el, idx) => idx > 1);

    // then
    expect(result).to.eql([ 50 ]);
    expect(resultByIndex).to.eql([ 500 ]);
  });


  describe('forEach', function() {

    // given
    var arr = [ {}, {}, {} ];

    it('basics', function() {

      // when
      forEach(arr, function(el, idx) {

        // then
        expect(arr[idx]).to.equal(el);
      });
    });


    it('return semantics', function() {
      let called = 0;

      // when
      let result = forEach(arr, function(el, idx) {

        called++;

        if (idx == 1) {
          return false;
        }
      });

      // then
      expect(called).to.eql(2);
      expect(result).to.eql(false);
    });

  });


  describe('without', function() {

    // given
    var obj = { };
    var arr = [ 1, obj, 'FALSE' ];

    it('exclude object', function() {

      // when
      var filtered = without(arr, obj);

      // then
      expect(filtered).to.eql([ 1, 'FALSE' ]);
    });


    it('exclude matching', function() {

      // when
      var filtered = without(arr, (el, idx) => el === 1);
      var filteredByIndex = without(arr, (el, idx) => idx === 1);

      // then
      expect(filtered).to.eql([ obj, 'FALSE' ]);
      expect(filteredByIndex).to.eql([ 1, 'FALSE' ]);
    });

  });


  describe('with matcher', function() {

    it('find', function() {

      // given
      var arr = [ { a: 1 }, { a: 3 } ];

      var matcher = createMatcher({ a: 1 });

      // when
      var el = find(arr, matcher);

      // then
      expect(el).to.equal(arr[0]);
    });

  });

});