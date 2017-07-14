angular
	.module('app.core')
	.controller('ProfileController', function ($scope, $location, HomeService, toastr, $localStorage) {
	  	init();
		
		function init() {
			if(typeof $localStorage.User != 'undefined' && $localStorage.User != null ){
				$scope.user = $localStorage.User;
			}
			loadUser();
		}		
	
		function loadUser() {
			HomeService.getUser()
				.then(response => { 
					$scope.user = response.data;
					$localStorage.User = $scope.user;
					updatePicture($scope.user);
				});
		}
	});