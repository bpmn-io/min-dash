import { expect } from 'chai';

import {
  flatten
} from '../lib/index.js';


describe('min-dash', function() {

  it('should work', function() {

    // given
    const arr = [ [ 'A', 'B', 'C' ], 'B' ];

    // when
    expect(flatten(arr)).to.eql(arr);
  });

});