angular.module("vidfusion").controller("LoginController", function($scope, $location, $route, Firebase) {
    var ref = Firebase;
    var OAUTH2_CLIENT_ID = "1037941277521-1tc48qa8m44vrjj4qeoqh4oasc6oov7i.apps.googleusercontent.com";
    var OAUTH2_SCOPES = ["https://www.googleapis.com/auth/youtube"];

    // Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
    // If the currently logged-in Google Account has previously authorized
    // the client specified as the OAUTH2_CLIENT_ID, then the authorization
    // succeeds with no user intervention. Otherwise, it fails and the
    // user interface that prompts for authorization needs to display.
    var checkAuth = function() {
      gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: false
      }, handleAuthResult);
    }

    // Handle the result of a gapi.auth.authorize() call.
    function handleAuthResult(authResult) {
      if (authResult && !authResult.error) {
        loadAPIClientInterfaces();
      } else {
        console.log(JSON.stringify(authResult, null, 2));
      }
    }

    // Load the client interfaces for the YouTube Analytics and Data APIs, which
    // are required to use the Google APIs JS client. More info is available at
    // http://code.google.com/p/google-api-javascript-client/wiki/GettingStarted#Loading_the_Client
    function loadAPIClientInterfaces() {
      gapi.client.load('youtube', 'v3', function() {
        console.log("YouTube API Successfully Loaded");
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

                checkAuth();
                loadAPIClientInterfaces();
                $location.path("/home");
                $route.reload();
    		} else {
    			console.log("Error with Google Authentication");
    		}
        });
	};
});
