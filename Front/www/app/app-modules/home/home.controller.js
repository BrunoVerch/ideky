angular
	.module('app.core')
	.controller('HomeController', function ($scope, $location, HomeService, toastr) {
	  
		loadUser();

		$scope.start = () => {
			$location.path('/game');
		}

		function loadUser() {
			HomeService.getUser()
				.then(response => $scope.user = response.data);
		}

	});