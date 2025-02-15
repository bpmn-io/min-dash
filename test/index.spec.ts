import { expectType } from 'ts-expect';

import { expect } from 'chai';

import {
  flatten
} from '../lib/index.js';


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

  });

});