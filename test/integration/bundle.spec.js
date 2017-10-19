var expect = require('chai').expect;


describe('integration', function() {

  describe('bundle', function() {

    it('should expose utilities', function() {

      // when
      var md = require('../../');

      // then
      expect(md.find).to.exist;
    });

  });

});