angular
	.module('app.core')
	.controller('ProfileController', function ($scope, $location, RankingService, GameService, toastr, $localStorage) {
	  	init();	
		
		function init() {
			$scope.user = $localStorage.User;	
			loadFriendsList();					
		}		

		function loadFriendsList() {
			GameService.getFriendsWhoPlayIdek()
				.then(response => loadPositionFriends(response.data));
		}

		function loadPositionFriends(friendsList) {
			RankingService.getFriendsRanking(friendsList)
				.then(response => {
					let friendsRanking = response.data.data;
					friendsRanking = friendsRanking.concat($scope.user);
					
					friendsRanking.sort((a, b) => b.Record - a.Record);
					
					$scope.user.PositionRankingFriends = 1 + friendsRanking.findIndex(item => item.FacebookId === $scope.user.FacebookId);
				});
		}
	});