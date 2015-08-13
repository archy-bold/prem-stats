'use strict';

describe('premStatsApp.version module', function() {
  beforeEach(module('premStatsApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
