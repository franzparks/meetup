'use strict';

/**
 * @ngdoc function
 * @name meetupApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the meetupApp
 */
angular.module('meetupApp')
.service('UserDataService', function() { //for passing user info between controllers
    var user = '';
 
    return {
        getUser: function() {
            return user;
        },
        setUser: function(value) {
            user = value;
        }
    };
})
  .controller('LoginCtrl', function ($scope,$location, $firebaseAuth, UserDataService) {
   var ref = new Firebase('https://franzmeetapp.firebaseio.com');
    var log = $firebaseAuth(ref);

    $scope.login = function() {
        log.$authWithPassword({
            email: $scope.user.email,
            password: $scope.user.password
        }).then(function() {
            console.log("Successfully logged in!")
            UserDataService.setUser($scope.user.email);
            $location.path('#/');
        }, function(err) {
            $scope.message = err.toString();
        });
    } // login 

  })

  .controller('RegisterCtrl', function ($scope,$location, $firebaseAuth) {
    var ref = new Firebase('https://franzmeetapp.firebaseio.com');
    var auth = $firebaseAuth(ref);

    $scope.signUp = function() {
      if (!$scope.regForm.$invalid) {
            var email = $scope.user.email;
            var password = $scope.user.password;
            if (email && password) {

                auth.$createUser({
                    email : email, 
                    password: password

                }).then(function() { 
                        console.log('User creation successful');
                        $location.path('#/login');
                    }, function(error) {
                        console.log(error);
                        $scope.regError = true;
                        $scope.regErrorMessage = error.message;
                    });
            }
        }
   };
    
  });

