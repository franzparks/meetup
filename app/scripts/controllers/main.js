'use strict';

/**
 * @ngdoc function
 * @name meetupApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the meetupApp
 --for formatting date and time
     Date: {{event.start | date: "MM/dd/yyyy"}}
      Time: {{event.start | date: "hh:mm a"}}
 */
angular.module('meetupApp')

  .controller('MainCtrl', function ($scope,$location,UserDataService) {
    $scope.username = UserDataService.getUser();
})
  .controller('createEventCtrl', function ($scope,$location,$filter, UserDataService) {
   
   $scope.hasAdditionalMsg = false;
   $scope.events = [];
   $scope.event = {};
  

   $scope.getAdditionalMessage = function(){
      return $scope.hasAdditionalMsg;
   };

   $scope.createEvent = function (event) {

        $scope.events.push(event);

        $location.path('/');
    };


  
});
