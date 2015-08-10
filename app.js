var vidfusion = angular.module("vidfusion", ["ngRoute"]);

vidfusion.factory("Firebase", function() {
    var ref = new Firebase("https://blistering-fire-2832.firebaseio.com/");
    return ref;
});

vidfusion.config(["$routeProvider", function($routeProvider) {
    $routeProvider.
        when("/", {
            templateUrl:"app/templates/landing.html",
            controller:"LoginController"
        }).
        when("/home", {
            templateUrl:"app/templates/homepage.html",
            controller:"HomePageController"
        }).
        otherwise({
            redirectTo: "/"
        });
}]);
