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
    // Login with Google using Firebase OAuth
    $scope.login = function() {
	    ref.authWithOAuthPopup("google", function(error, authData) {
		if(!error) {
			console.log("Login Successful");
			$scope.user = authData;
		} else {
			console.log("Error with Google Authentication");
		}
	});
}
});

vidfusion.controller("SecureController", function($scope) {
    //$scope.username =
});
