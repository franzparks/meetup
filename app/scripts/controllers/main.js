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
  .controller('CreateEventCtrl', function ($scope,$location,$filter, UserDataService,$firebaseArray) {
   
   $scope.hasAdditionalMsg = false;
   //$scope.events = []; Now using firebase to store events
   $scope.event = {
     emailId : UserDataService.getUser()
   };
  

   $scope.getAdditionalMessage = function(){
      return $scope.hasAdditionalMsg;
   };

   $scope.createEvent = function (event) {

       var ref = new Firebase('https://franzmeetapp.firebaseio.com/events');

        ref.set(event, function(error) {
            if (error) {
               console.log("Error:", error);
            }else{
             $location.path('/');
            }
        });
 
    }
  
});
