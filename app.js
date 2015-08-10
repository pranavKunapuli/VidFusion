var vidfusion = angular.module("vidfusion", []);

vidfusion.factory("Firebase", function() {
    var ref = new Firebase("https://blistering-fire-2832.firebaseio.com/");
    return ref;
});
