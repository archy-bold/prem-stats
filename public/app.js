'use strict';

// Declare app level module which depends on views, and components
angular.module('premStatsApp', [
  'ngRoute',
  'premStatsApp.tableView',
  'premStatsApp.teamView',
  'premStatsApp.services',
  'premStatsApp.version',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/table'});
}]);

// Services
angular.module('premStatsApp.services', []).
  factory('footballAPIService', function($http, $filter) {

    var footballAPI = {
    	url: 'http://prem-stats.dev/api.php'
    };

    footballAPI.getStandings = function() {
      return $http({
        method: 'JSON', 
        url: footballAPI.url + '?action=standings&comp_id=1204'
      });
    }

    footballAPI.getFixtures = function(dateFrom, dateTo) {
    	if (typeof dateFrom == 'undefined'){
    		dateFrom = new Date();
    	}
    	if (typeof dateTo == 'undefined'){
    		dateTo = new Date();
    		dateTo.setMonth(dateTo.getMonth() + 1);
    	}

    	return $http({
    		method: 'JSON',
    		url: footballAPI.url + '?action=fixtures'
    			+ '&from_date=' + footballAPI.formatDate(dateFrom)
    			+ '&to_date=' + footballAPI.formatDate(dateTo)
    	})
    }

    footballAPI.formatDate = function(date) {
    	return $filter('date')(date, 'dd.MM.yyyy');
    }

    return footballAPI;
  });
