'use strict';

angular.module('premStatsApp.teamView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/team/:id', {
    templateUrl: 'views/team/team.html',
    controller: 'teamController'
  });
}])

.controller('teamController', function($scope) {

});