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
  })

  .controller('createEventCtrl', function ($scope,$location,UserDataService) {
   
   $scope.message = false;

   $scope.additionalMessage = function(){
      return $scope.message;
   };

   $scope.createEvent = function (eventDetails) {
        if (eForm.$valid) {
        $scope.event = eventDetails.name
                            + " (" + eventDetails.host + ") ("
                            + eventDetails.start+ ")";
        } else {
                $scope.showValidation = true;
        } 
    };

    $scope.getError = function (error) {
            if (angular.isDefined(error)) {
                if (error.required) {
                    return "Please enter a value";
                } 
            }
    };
});
