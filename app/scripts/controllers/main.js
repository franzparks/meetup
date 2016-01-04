'use strict';

/**
 * @ngdoc function
 * @name meetupApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the meetupApp
 */
angular.module('meetupApp')
  .controller('MainCtrl', function ($scope,$location,UserDataService) {
    $scope.username = UserDataService.getUser();
    
    $scope.events = [
    {"name": "Tech in 2016", "location" : "Santa Clara"},
    {"name": "Tech in 2016", "location" : "Santa Clara"}
    
    ];

    $scope.create = function(){
    	$scope.events.push({"name" : $scope.name, "location" : $scope.location});
    	$location.path('/');
    	//$scope.name = '';
    	//$scope.location = '';
    };
  });
