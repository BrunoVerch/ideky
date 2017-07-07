angular
	.module('app.core')
	.controller('GameController', function ($scope, $location, $localStorage, toastr) {

	function init() {
		//Carrega todos os amigos 
		userService.getFriends('friends', response => {
			$scope.friends = response.data;
			userService.getFriends('invitable_friends', 
				res => $scope.friends = $scope.friends.concat(res.data));
		});
  }
});