'use strict';

// Declare app level module which depends on views, and components
angular.module('premStatsApp', [
  'ngRoute',
  'premStatsApp.tableView',
  'premStatsApp.version',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/table'});
}]);
