var vidfusion = angular.module("vidfusion", ["ui.router"]);
var ref = new Firebase("https://blistering-fire-2832.firebaseio.com/");

vidfusion.config(function($stateProvider, $urlRouteProvider) {
    $stateProvider
        .state("landingPage", {
            url: "/landing",
            template: "templates/landing.html",
            contorller: "LoginController"
        })
        .state("secure", {
            url: "/secure",
            template: "templates/secure.html",
            controller: "SecureController"
        });
    $urlRouteProvider.otherwise("/login");
});

vidfusion.controller("LoginController", function($scope) {
    $scope.client_id = "1037941277521-25nd37qbdsb5daqlm1fcsh7fub418sfs.apps.googleusercontent.com";
    var scopes = ['https://www.googleapis.com/auth/youtube'];

    $scope.googleLogin = function() {
        gapi.auth.authorize({client_id: $scope.clientId, scope: scopes, immediate: true}, handleAuthResult);
    };

    function handleAuthResult(authResult) {
      if (authResult && !authResult.error) {
        loadAPI();
      } else {
        console.log("authResult returned an error")
      }
    }

    function handleAuthClick(event) {
      gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
      return false;
    }

    function loadAPI() {
        gapi.client.load("youtube", "v3", function() {
            console.log("Youtube Loaded Successfully");
        });
    }

    // Login with Google using Firebase OAuth
    $scope.login = function() {
	    ref.authWithOAuthPopup("google", function(error, authData) {
    		if(!error) {
    			console.log("Login Successful");
    			$scope.user = authData;
    		} else {
    			console.log("Error with Google Authentication");
    		}
        }
	});

});

vidfusion.controller("SecureController", function($scope) {
    //$scope.username =
});
