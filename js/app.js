var vidfusion = angular.module("vidfusion", ["ui.router"]);

vidfusion.config(function($stateProvider, $urlRouteProvider) {
    $stateProvider
        .state("login", {
            url: "/login",
            template: "templates/login.html",
            contorller: "LoginController"
        })
        .state("secure", {
            url: "/secure"
            template: "templates/secure.html",
            controller: "SecureController"
        });
    $urlRouteProvider.otherwise("/login");
});

vidfusion.controller("LoginController", function($scope) {
    $scope.login = function() {

        gapi.client.load("youtube", "v3").then(function() {
            console.log("Youtube Loaded");
        })
    }
});

vidfusion.controller("SecureController", function($scope) {
    $scope.username =
});
