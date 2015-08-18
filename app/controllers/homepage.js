angular.module("vidfusion").controller("HomePageController", function($scope, $location, Firebase) {
    var ref = Firebase;

    $scope.videos = {};

    $scope.requestUserUploads= function() {
        var userUploadsRequest = gapi.client.youtube.channels.list({
            mine: true,
            part: "contentDetails"
        });

        userUploadsRequest.execute(function(response) {
            $scope.playlistID = response.result.items[0].contentDetails.relatedPlaylists.uploads;
            requestVideoPlaylist();
        });

        var requestVideoPlaylist = function() {
            var playlistRequest = gapi.client.youtube.playlistItems.list({
                playlistId: $scope.playlistID,
                part: "snippet",
                maxResults: 10
            });

            playlistRequest.execute(function(response) {
                var playlistItems = response.result.items;
                console.log(JSON.stringify(playlistItems, null, 2));
            });
        };
    }
});
