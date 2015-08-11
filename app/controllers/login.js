angular.module("vidfusion").controller("LoginController", function($scope, $location, $route, Firebase) {
    var clientId = "1037941277521-25nd37qbdsb5daqlm1fcsh7fub418sfs.apps.googleusercontent.com";
    var scopes = ['https://www.googleapis.com/auth/youtube'];
    var ref = Firebase;

    var googleLogin = function() {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
    };

    function handleAuthResult(authResult) {
      if (authResult && !authResult.error) {
        loadAPI();
      } else {
        console.log("authResult returned an error");
        console.log(JSON.stringify(authResult, null, 2));
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
                //console.log(JSON.stringify(authData, null, 2));
                var uid = authData.google.cachedUserProfile.id;
                ref.child("Users").push({
                    "given_name": authData.google.cachedUserProfile.given_name,
                    "family_name": authData.google.cachedUserProfile.family_name,
                    "id": authData.google.cachedUserProfile.id
                });

                googleLogin();
                $location.path("/home");
                $route.reload();
    		} else {
    			console.log("Error with Google Authentication");
    		}
        });
	};
});
