'use strict';

angular.module('premStatsApp.tableView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/table', {
    templateUrl: 'views/table/table.html',
    controller: 'tableController'
  });
}])

.controller('tableController', function($scope) {

	$scope.standings = [
      {
          Team: {
              name: 'Manchester City',
              shortNmae: 'Man City',
              badge: 'none'
          },
          played: 1,
          goalDifference: 3,
          points: 3
      },
      {
          Team: {
              name: 'Leicester',
              shortNmae: 'Leicester',
              badge: 'none'
          },
          played: 1,
          goalDifference: 2,
          points: 3
      },
      {
          Team: {
              name: 'Crystal Palace',
              shortNmae: 'Crystal Palace',
              badge: 'none'
          },
          played: 1,
          goalDifference: 2,
          points: 3
      },
      {
          Team: {
              name: 'West Ham United',
              shortNmae: 'West Ham',
              badge: 'none'
          },
          played: 1,
          goalDifference: 2,
          points: 3
      },
      {
          Team: {
              name: 'Aston Villa',
              shortNmae: 'Aston Villa',
              badge: 'none'
          },
          played: 1,
          goalDifference: 1,
          points: 3
      },
      {
          Team: {
              name: 'Liverpool',
              shortNmae: 'Liverpool',
              badge: 'none'
          },
          played: 1,
          goalDifference: 1,
          points: 3
      },
      {
          Team: {
              name: 'Manchester United',
              shortNmae: 'Man Utd',
              badge: 'none'
          },
          played: 1,
          goalDifference: 1,
          points: 3
      }
    ];

});
