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

  .controller('MainCtrl', function ($scope,UserDataService) {
    $scope.username = UserDataService.getUser();
})
  .controller('CreateEventCtrl', function ($scope,$location,$filter, UserDataService) {
   
   $scope.hasAdditionalMsg = false;
   //$scope.events = []; //Now using firebase to store events
   $scope.event = {
     emailId : UserDataService.getUser()
   };
  

   $scope.getAdditionalMessage = function(){
      return $scope.hasAdditionalMsg;
   };

   $scope.createEvent = function (event) {
      // Get a database reference to the events
       var ref = new Firebase('https://franzmeetapp.firebaseio.com/events');

        ref.push(event);
        //redirect to home page
        $location.path('/');
 
    }
  
})

.controller('GetEventsCtrl', function ($scope,$filter, UserDataService,$firebaseArray) {

   $scope.events = []; 
   
  // Get a database reference to the events
var ref = new Firebase("https://franzmeetapp.firebaseio.com/events");
// Attach an asynchronous callback to read the data at the events reference
ref.on("value", function(snapshot) {
  var data =   snapshot.val();
  console.log(data);
  $scope.events = data;
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
  
});

