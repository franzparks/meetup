'use strict';

/**
 * @ngdoc function
 * @name meetupApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the meetupApp
 */
angular.module('meetupApp')
.service('UserDataService', function($firebaseAuth,$location) { //for passing user info between controllers
    var user = '';
    var ref = new Firebase("https://franzmeetapp.firebaseio.com");
    var loginObj = $firebaseAuth(ref);

    return {

        getUser : function() {
            return user;
        },
        setUser: function(value) {
            user = value;
        },

        logoutUser: function(){
            loginObj.$unauth();
            user = ''; //to make sure views get empty value for user
            console.log('Successfully logged out!');
            $location.path('/loggedout');
        }
    };
})

  .controller('LoginCtrl', function ($scope,$location, $firebaseAuth, UserDataService) {
   var ref = new Firebase('https://franzmeetapp.firebaseio.com');
    var log = $firebaseAuth(ref);

    $scope.loginError = false;

    $scope.getLoginError = function(){
     return $scope.loginError;
    };
 
    $scope.login = function() {

        log.$authWithPassword({
            email: $scope.user.email,
            password: $scope.user.password

        }).then(function(authData) {
    
            console.log("Successfully logged in!")
            UserDataService.setUser($scope.user.email);
            $location.path('#/');
        }, function(err) {
            $scope.loginError = true;
            $scope.message = err.message;
        });
    } // login 

    

  })

  .controller('RegisterCtrl', function ($scope,$location, $firebaseAuth) {
    var ref = new Firebase('https://franzmeetapp.firebaseio.com');
    var auth = $firebaseAuth(ref);

    $scope.regError = false; //for filtering on view

    $scope.getRegError = function(){
     return $scope.regError;
    };

    $scope.signUp = function() {
      if (!$scope.regForm.$invalid) {

           var name = $scope.user.name;
            var email = $scope.user.email;
            var password = $scope.user.password;

            $scope.oldEmail = ''; //for comparing new email entered by user after reg failure
            $scope.getOldEmail = function(){
                return $scope.oldEmail;
            };

            if (email && password) {
                $scope.oldEmail = email;
                auth.$createUser({
                    name : name,
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
   }; //sign up
    
  });

