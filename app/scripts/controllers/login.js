'use strict';

/**
 * @ngdoc function
 * @name meetupApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the meetupApp
 */
angular.module('meetupApp')
  .controller('LoginCtrl', function ($scope,$location, $firebaseAuth) {
   var ref = new Firebase('https://franzmeetapp.firebaseio.com');
    var simpleLogin = $firebaseAuth(ref);

    $scope.login = function() {
        simpleLogin.$authWithPassword({
            email: $scope.user.email,
            password: $scope.user.password
        }).then(function() {
          console.log("Successfully logged in!")
            $location.path('#/');
        }, function(err) {
            $scope.message = err.toString();
        });
    } // login

  });
