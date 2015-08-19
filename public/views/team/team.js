'use strict';

angular.module('premStatsApp.teamView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/team/:id', {
    templateUrl: 'views/team/team.html',
    controller: 'teamController'
  });
}])

.controller('teamController', function($scope, $routeParams, footballAPIService) {
	$scope.id = $routeParams.id;
	$scope.nextMatch = null;
	$scope.lastMatch = null;
	$scope.team = null;

	footballAPIService.getFixtures().success(function (response) {
		for (var i = 0; i < response.matches.length; i++) {
			var match = response.matches[i];

			var homeTeamId = parseInt(match.match_localteam_id);
			var awayTeamId = parseInt(match.match_visitorteam_id);
			if (homeTeamId == $scope.id || awayTeamId == $scope.id){
				$scope.nextMatch = footballAPIService.formatMatch(match);
				break;
			}
		};
	});

	// Get the last fixture.
	var today = new Date();
	var lastWeek = new Date();
	lastWeek.setDate(lastWeek.getDate() - 7);
	footballAPIService.getFixtures(lastWeek, today).success(function (response) {
		for (var i = 0; i < response.matches.length; i++) {
			var match = response.matches[i];

			var homeTeamId = parseInt(match.match_localteam_id);
			var awayTeamId = parseInt(match.match_visitorteam_id);
			if (homeTeamId == $scope.id || awayTeamId == $scope.id){
				$scope.lastMatch = footballAPIService.formatMatch(match);
			}
		};
	});

	// Get their standings in the table.
	footballAPIService.getStandings().success(function (response) {
		for (var i = 0; i < response.teams.length; i++) {
	    	var team = response.teams[i];
			var teamId = parseInt(team.stand_team_id, 10);

			if (teamId == $scope.id){
	        	$scope.team = footballAPIService.formatStanding(team);
			}
        }
	});
}).filter('myDateFormat', function myDateFormat($filter){
  return function(text){
    var  tempdate= new Date(text.replace(/-/g,"/"));
    return $filter('date')(tempdate, "MMM-dd-yyyy");
  }
})
