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

  cache : false;

  var geocoder = new google.maps.Geocoder();
  $scope.geoLoc = ''; 

   $scope.getLoc = function(){ 
        return $scope.geoLoc;
  };

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

        if (angular.isUndefined($scope.event.location)) {
          $scope.event.location = $scope.geoLoc;
        }

        ref.push(event);
        //redirect to home page after push
        $location.path('/');
 
    }

    /// Geo location info
    $scope.successFunction = function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      $scope.codeLatLng(lat, lng);
    }

    $scope.errorFunction = function(){
      console.log("Geolocation is not supported by this browser.");
    }

    $scope.codeLatLng = function(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);

    geocoder.geocode({'latLng': latlng },  function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
           console.log("more results",results)
          if (results[1]) {
           //formatted address
          //alert(results[0].formatted_address)
          $scope.geoLoc = results[0].formatted_address;
          //find country name
             for (var i=0; i<results[0].address_components.length; i++) {
                 for (var b=0;b<results[0].address_components[i].types.length;b++) {
                //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                    if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                      //this is the object you are looking for
                      $scope.city = results[0].address_components[i];
                      break;
                    }
                 }
             }
          }
        } 
    });
    }

    $scope.getLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.successFunction, $scope.errorFunction);
        } else {
            $scope.error = "Geolocation is not supported by this browser.";
        }
    }

 $scope.getLocation();
  
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

