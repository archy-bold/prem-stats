'use strict';

angular.module('premStatsApp.tableView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/table', {
    templateUrl: 'views/table/table.html',
    controller: 'tableController'
  });
}])

.controller('tableController', function($scope, footballAPIService) {

	$scope.nameFilter = null;
	$scope.standings = [];

	$scope.searchFilter = function (driver) {
		var keyword = new RegExp($scope.nameFilter, 'i');
		return !$scope.nameFilter || keyword.test(driver.Team.name);
	};

    footballAPIService.getStandings().success(function (response) {
        //Dig into the responde to get the relevant data
        for (var i = 0; i < response.teams.length; i++) {
            var obj = footballAPIService.formatStanding(response.teams[i])

        	$scope.standings.push(obj);
        }
    });

});
