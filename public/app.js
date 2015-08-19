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

    footballAPI.formatStanding = function(teamData){
    	var slug = teamData.stand_team_name.replace(' ', '-').toLowerCase();

        // Make replacements for shortened names.
        slug = slug.replace('-utd', '');
        slug = slug.replace('manchester', 'man');
        slug = slug.replace('united', 'utd');
        if (slug.indexOf('man') === -1){
            slug = slug.replace('-city', '');
        }
        if (slug == 'tottenham'){
            slug = 'spurs';
        }

        var firstLetter = slug.substring(0, 1);
        var badge = 'http://www.premierleague.com/content/dam/premierleague/shared-images/clubs/'
        + firstLetter + '/'
        + slug + '/logo.png/_jcr_content/renditions/cq5dam.thumbnail.48.48.png';

    	var obj = {
    		Team: {
                id: parseInt(teamData.stand_team_id, 10),
    			name: teamData.stand_team_name,
                badge: badge
    		},
    		position: parseInt(teamData.stand_position, 10),
    		played: parseInt(teamData.stand_overall_gp, 10),
    		won: parseInt(teamData.stand_overall_w, 10),
    		drawn: parseInt(teamData.stand_overall_d, 10),
    		lost: parseInt(teamData.stand_overall_l, 10),
    		goalsScored: parseInt(teamData.stand_overall_gs, 10),
    		goalsAgainst: parseInt(teamData.stand_overall_ga, 10),
    		goalDifference: parseInt(teamData.stand_gd, 10),
    		points: parseInt(teamData.stand_points, 10),
    		form: teamData.stand_recent_form.split('').reverse().join('')
    	}

    	return obj;
    }

    return footballAPI;
  });
