var expect = require('chai').expect;

import {
  has,
  isDefined,
  isFunction,
  isUndefined,
  isNil
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


  describe('isDefined', function() {

    it('should work', function() {

      // then
      expect(isDefined(1)).to.be.true;
      expect(isDefined(0)).to.be.true;
      expect(isDefined('')).to.be.true;
      expect(isDefined({})).to.be.true;

      expect(isDefined(null)).to.be.true;

      expect(isDefined()).to.be.false;
      expect(isDefined(undefined)).to.be.false;
      expect(isDefined(void 0)).to.be.false;
    });

  });


  describe('isUndefined', function() {

    it('should work', function() {

      // then
      expect(isUndefined(1)).to.be.false;
      expect(isUndefined(0)).to.be.false;
      expect(isUndefined('')).to.be.false;
      expect(isUndefined({})).to.be.false;

      expect(isUndefined(null)).to.be.false;

      expect(isUndefined()).to.be.true;
      expect(isUndefined(undefined)).to.be.true;
      expect(isUndefined(void 0)).to.be.true;
    });

  });


  describe('isNil', function() {

    it('should work', function() {

      // then
      expect(isNil(1)).to.be.false;
      expect(isNil(0)).to.be.false;
      expect(isNil('')).to.be.false;
      expect(isNil({})).to.be.false;

      expect(isNil(null)).to.be.true;
      expect(isNil()).to.be.true;
      expect(isNil(undefined)).to.be.true;
      expect(isNil(void 0)).to.be.true;
    });

  });


  describe('isFunction', function() {

    it('should work', function() {

      // then
      expect(isFunction(function() {})).to.be.true;
      expect(isFunction(async function() {})).to.be.true;

      expect(isFunction(() => {})).to.be.true;
      expect(isFunction(async () => {})).to.be.true;

      expect(isFunction(function* generator() {})).to.be.true;
      expect(isFunction(async function* asyncGenerator() {})).to.be.true;

      expect(isFunction({})).to.be.false;
      expect(isFunction(undefined)).to.be.false;
    });

  });

});