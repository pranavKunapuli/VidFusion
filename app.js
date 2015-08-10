var vidfusion = angular.module("vidfusion", []);

vidfusion.factory("Firebase", function() {
    var ref = new Firebase("https://blistering-fire-2832.firebaseio.com/");
    return ref;
});

vidfusion.config(function($routeProvider) {
    $routeProvider.
        when("/", {
            templateUrl:"templates/landing.html",
            controller:"LoginController"
        }).
        when("/home", {
            templateUrl:"templates/homepage.html",
            controller:"HomePageController"
        }).
        otherwise({
            redirectTo: "/"
        });
});
