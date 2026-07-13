import { expectType } from 'ts-expect';

import { expect } from 'chai';

import {
  debounce,
  flatten,
  throttle
} from 'min-dash';


describe('min-dash', function() {

  describe('should work', function() {

    it('flatten', function() {

      // then
      expectType<string[]>(flatten([ [ 'A', 'B', 'C' ], 'B' ]));
      expectType<string[]>(flatten([ 'A', 'B', 'C', 'B' ]));
      expectType<string[]>(flatten([ [ 'A' ], [ 'B' ], [ 'C', 'B'] ]));

      expectType<(string|number|number[])[]>(flatten([
        [ 'A', 1 ],
        [ 'B' ],
        [ 'C', [ 1, 2, 3 ] ],
        [ 'D' ]
      ]));

      expectType<unknown[]>(flatten([ null ]));
      expectType<unknown[]>(flatten(null));

      // when
      expect(flatten([ [ 'A', 'B', 'C' ], 'B' ])).to.eql([ 'A', 'B', 'C' ]);
    });

    it('debounce + throttle', function() {

      const debounced = debounce((prefix: string, count: number) => {
        return `${prefix}:${count}`;
      }, 100);

      expectType<void>(debounced('A', 1));
      expectType<() => void>(debounced.flush);
      expectType<() => void>(debounced.cancel);

      // @ts-expect-error debounce should preserve wrapped argument types
      debounced(1, 'A');

      const throttled = throttle((prefix: string, count: number) => {
        return `${prefix}:${count}`;
      }, 100);

      expectType<void>(throttled('A', 1));

      // @ts-expect-error throttle should preserve wrapped argument types
      throttled(1, 'A');
    });

  });

});