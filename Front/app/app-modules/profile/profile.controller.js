angular
	.module('app.core')
	.controller('ProfileController', function ($scope, $location, RankingService, GameService, toastr, $localStorage) {
	  	init();	
		
		function init() {
			$scope.user = $localStorage.User;	
			loadFriendsList();					
		}		

		function loadFriendsList() {
			GameService
			.getFriendsWhoPlayIdek()
			.then(response => {
				var friendsList = response.data;
				console.log(response);
				loadPositionFriends(friendsList);
			})
		}

		function loadPositionFriends(friendsList) {
			RankingService
			.getFriendsRanking(friendsList)
			.then(response => {
				var position = response.data;
				$scope.positionRankingFriends 
				console.log(response);
			})
		}
	});