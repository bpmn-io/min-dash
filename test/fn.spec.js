/* global global */

import {
  use as chaiUse,
  expect
} from 'chai';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chaiUse(sinonChai);

import {
  bind,
  debounce,
  throttle
} from '../lib/fn.js';


describe('fn', function() {

  describe('bind', function() {

    it('should bind fn', function() {

      // given
      let fn = function() {

        // @ts-ignore-error "this"
        return this.foo;
      };

      let target = { foo: 'FOO' };

      // when
      let boundFn = bind(fn, target);

      let result = boundFn();

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

      let callback = sinon.spy();
      let debounced = debounce(callback, 100);

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

      let callback = sinon.spy();
      let debounced = debounce(callback, 100);

      // when
      debounced(1);
      debounced('BAR', 3);

      // ticked...
      clock.tick(101);

      // then
      expect(callback).to.have.been.calledOnceWith('BAR', 3);
    });


    it('should use last this', function() {

      let self = {};

      let callback = sinon.spy(function() {

        // @ts-ignore-error "this"
        expect(this).to.equal(self);
      });

      let debounced = debounce(callback, 100);

      // when
      debounced.apply({});
      debounced.apply(self, [ 'BAR', 3 ]);

      // ticked...
      clock.tick(101);

      // then
      expect(callback).to.have.been.calledOnce;
    });


    it('should not repetitively call #clearTimeout', function() {

      let callback = sinon.spy();
      let debounced = debounce(callback, 100);

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
      expect(clearTimeout).to.have.been.calledOnce;
    });


    it('should #cancel', function() {

      var callback = sinon.spy();
      var debounced = debounce(callback, 100);

      // when
      debounced();
      debounced.cancel();

      // debounce timer elapsed
      clock.tick(101);

      // then
      expect(callback).not.to.have.been.called;
    });


    it('should #flush', function() {

      var callback = sinon.spy();
      var debounced = debounce(callback, 100);

      // when
      debounced();
      debounced.flush();

      // then
      expect(callback).to.have.been.calledOnce;

      // but when
      // debounce timer elapsed
      clock.tick(101);

      // then
      expect(callback).to.have.been.calledOnce;
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

      let callback = sinon.spy();
      let throttled = throttle(callback, 100);

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