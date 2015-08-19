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
        	var team = response.teams[i];

        	var obj = {
        		Team: {
                    id: parseInt(team.stand_team_id, 10),
        			name: team.stand_team_name
        		},
        		position: parseInt(team.stand_position, 10),
        		played: parseInt(team.stand_overall_gp, 10),
        		won: parseInt(team.stand_overall_w, 10),
        		drawn: parseInt(team.stand_overall_d, 10),
        		lost: parseInt(team.stand_overall_l, 10),
        		goalsScored: parseInt(team.stand_overall_gs, 10),
        		goalsAgainst: parseInt(team.stand_overall_ga, 10),
        		goalDifference: parseInt(team.stand_gd, 10),
        		points: parseInt(team.stand_points, 10)
        	}

        	$scope.standings.push(obj);
        	
        }
        var standings = response.teams;
    });

});
