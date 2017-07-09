angular
	.module('app.core')
	.controller('GameController', function ($rootScope, $scope, $window, GameService) {
		
		setTimeout(function() {
			init();
		}, 5000);

	function  init() {
		//Carrega todos os amigos 
		GameService.getFriends('friends', response => {
			$scope.friends = response.data;
			GameService.getFriends('invitable_friends', 
				res => $scope.friends = $scope.friends.concat(res.data));

		});
  }
});