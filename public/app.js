'use strict';

// Declare app level module which depends on views, and components
angular.module('premStatsApp', [
  'ngRoute',
  'premStatsApp.tableView',
  'premStatsApp.services',
  'premStatsApp.version',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/table'});
}]);

// Services
angular.module('premStatsApp.services', []).
  factory('footballAPIService', function($http) {

    var footballAPI = {
    	url: 'http://prem-stats.dev/api.php',
    };

    footballAPI.getStandings = function() {
      return $http({
        method: 'JSON', 
        url: footballAPI.url + '?action=standings&comp_id=1204'
      });
    }

    return footballAPI;
  });
