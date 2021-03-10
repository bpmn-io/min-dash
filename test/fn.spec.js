const chai = require('chai');

const expect = chai.expect;

const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

import {
  bind,
  debounce,
  throttle
} from '../lib/fn';


describe('fn', function() {

  describe('bind', function() {

    it('should bind fn', function() {

      // given
      const fn = function() {
        return this.foo;
      };

      const target = { foo: 'FOO' };

      // when
      const boundFn = bind(fn, target);

      const result = boundFn();

      // then
      expect(result).to.eql('FOO');
    });

  });


  describe('debounce', function() {

    let clock, clearTimeout;

    beforeEach(function() {
      clock = sinon.useFakeTimers();
    });

    afterEach(function() {
      clock.restore();

      if (clearTimeout) {
        clearTimeout.restore();
      }
    });


    it('should debounce fn', function() {

      const callback = sinon.spy();
      const debounced = debounce(callback, 100);

      // when
      debounced();

      // then
      expect(callback).not.to.have.been.called;

      // ticked...
      clock.tick(99);

      // then
      expect(callback).not.to.have.been.called;

      // when
      debounced();

      // then
      expect(callback).not.to.have.been.called;

      // debounce timer elapsed
      clock.tick(101);

      // then
      expect(callback).to.have.been.calledOnce;
    });


    it('should pass last args', function() {

      const callback = sinon.spy();
      const debounced = debounce(callback, 100);

      // when
      debounced(1);
      debounced('BAR', 3);

      // ticked...
      clock.tick(101);

      // then
      expect(callback).to.have.been.calledOnceWith('BAR', 3);
    });


    it('should use last this', function() {

      const self = {};

      const callback = sinon.spy(function() {
        expect(this).to.equal(self);
      });

      const debounced = debounce(callback, 100);

      // when
      debounced.apply({});
      debounced.apply(self, ['BAR', 3 ]);

      // ticked...
      clock.tick(101);

      // then
      expect(callback).to.have.been.calledOnce;
    });


    it('should not #clearTimeout', function() {

      const callback = sinon.spy();
      const debounced = debounce(callback, 100);

      clearTimeout = sinon.spy(global, 'clearTimeout');

      // when
      debounced();
      debounced();

      // ticked...
      clock.tick(99);

      debounced();

      // debounce timer elapsed
      clock.tick(101);

      // then
      expect(callback).to.have.been.calledOnce;
      expect(clearTimeout).not.to.have.been.called;
    });

  });


  describe('throttle', function() {

    let clock;

    beforeEach(function() {
      clock = sinon.useFakeTimers();
    });

    afterEach(function() {
      clock.restore();
    });


    it('should throttle fn', function() {

      const callback = sinon.spy();
      const throttled = throttle(callback, 100);

      // when
      throttled();

      // then
      expect(callback).to.have.been.calledOnce;

      // ticked...
      clock.tick(99);

      throttled();

      // then
      expect(callback).to.have.been.calledOnce;

      // throttle interval elapsed
      clock.tick(101);

      // when
      throttled();

      // then
      expect(callback).to.have.been.calledTwice;
    });

  });

});