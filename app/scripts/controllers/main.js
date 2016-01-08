'use strict';

/**
 * @ngdoc function
 * @name meetupApp.controller:MainCtrl
 * @name meetupApp.controller:CreateEventCtrl
 * @name meetupApp.controller:GetEventsCtrl
 * @description
 * # MainCtrl
 * # CreateEventCtrl
 * # GetEventsCtrl
 
 * Controller of the meetupApp
 
 */
angular.module('meetupApp')


  .controller('MainCtrl', function ($scope,UserDataService,$location) {

    $scope.username = UserDataService.getUser();

    $scope.login = {};
   
    $scope.isLoggedIn = function(){ 
        return UserDataService.getUser().length > 0;
    };


    $scope.logout = function(){
      UserDataService.logoutUser();
    };

})
  .controller('CreateEventCtrl', function ($scope,$location,$filter,UserDataService) {
   
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
        
        if (angular.isDefined($scope.event.start)) {
            var startDate = $scope.event.start;
            $scope.event.start = startDate.getTime();
            console.log(startDate.getTime());
        }

        if (angular.isDefined($scope.event.end)) {
            var endDate = $scope.event.end;
            $scope.event.end = endDate.getTime();
        }

        ref.push(event);
        //redirect to home page after push
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

