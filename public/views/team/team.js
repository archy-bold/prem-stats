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

	function parseMatch(apiMatch){
		var dateParts = apiMatch.match_formatted_date.split('.');
		var timeParts = apiMatch.match_time.split(':');
		var day = parseInt(dateParts[0]);
		var month = parseInt(dateParts[1]) - 1;
		var year = parseInt(dateParts[2]);
		var hour = parseInt(timeParts[0]);
		var minute = parseInt(timeParts[1]);

		return {
			homeTeam: {
				id: parseInt(apiMatch.match_localteam_id, 10),
				name: apiMatch.match_localteam_name
			},
			awayTeam: {
				id: parseInt(apiMatch.match_visitorteam_id, 10),
				name: apiMatch.match_visitorteam_name
			},
			scoreHome: parseInt(apiMatch.match_localteam_score, 10),
			scoreAway: parseInt(apiMatch.match_visitorteam_score, 10),
			date: new Date(year, month, day, hour, minute)
		};
	}

	// Get the upcoming fixture.
	footballAPIService.getFixtures().success(function (response) {
		for (var i = 0; i < response.matches.length; i++) {
			var match = response.matches[i];

			var homeTeamId = parseInt(match.match_localteam_id);
			var awayTeamId = parseInt(match.match_visitorteam_id);
			if (homeTeamId == $scope.id || awayTeamId == $scope.id){
				$scope.nextMatch = parseMatch(match);
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
				$scope.lastMatch = parseMatch(match);
			}
		};
	});

	// Get their standings in the table.
	footballAPIService.getStandings().success(function (response) {
		for (var i = 0; i < response.teams.length; i++) {
	    	var team = response.teams[i];
			var teamId = parseInt(team.stand_team_id, 10);

			if (teamId == $scope.id){
	        	$scope.team = {
	        		Team: {
	                    id: teamId,
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
	        		points: parseInt(team.stand_points, 10),
	        		form: team.stand_recent_form
	        	}
			}
        }
	});
}).filter('myDateFormat', function myDateFormat($filter){
  return function(text){
    var  tempdate= new Date(text.replace(/-/g,"/"));
    return $filter('date')(tempdate, "MMM-dd-yyyy");
  }
})
