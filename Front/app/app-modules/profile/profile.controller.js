angular
	.module('app.core')
	.controller('ProfileController', function ($scope, $location, RankingService, GameService, toastr, $localStorage) {
	  	init();	

		$scope.play = () => $location.path('/game');
		
		function init() {
			$scope.user = $localStorage.User;	
			loadFriendsList();	
			loadOverallRanking();				
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

		function loadOverallRanking() {
			let overallRank;
			RankingService.getOverallRank()
				.then(response => loadOverallPosition(response.data.data))
				.catch(error => console.log(error));
		}

		function loadOverallPosition(overallRank) {
			$scope.user.PositionRaking = 1 + overallRank
				.sort((a, b) => b.Record - a.Record)
				.findIndex(item => item.Name === $scope.user.Name); 
		}
	});