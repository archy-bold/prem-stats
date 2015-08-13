'use strict';

angular.module('premStatsApp.version', [
  'premStatsApp.version.interpolate-filter',
  'premStatsApp.version.version-directive'
])

.value('version', '0.1');
