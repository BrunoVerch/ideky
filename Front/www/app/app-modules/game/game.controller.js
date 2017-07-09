angular
	.module('app.core')
	.controller('GameController', function ($scope, $window, GameService) {
		

		setTimeout(function() {
			init();
			setTimeout(function() {
				$scope.friends = shuffle($scope.friends);
			}, 1000);
		}, 5000);

	function  init() {
		//Carrega todos os amigos 
		GameService.getFriends('friends', response => {
			$scope.friends = response.data;
			GameService.getFriends('invitable_friends', 
				res => $scope.friends = $scope.friends.concat(res.data));
		});
  }

	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		while (0 !== currentIndex) {

			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}
});