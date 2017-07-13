angular
	.module('app.core')
	.controller('HomeController', function ($scope, $location, HomeService, toastr) {
	  
		init();
		
		function init() {
			loadUser();
		}
		
		$scope.start = () => {
			$location.path('/game');
		}

		function loadUser() {
			HomeService.getUser()
				.then(response => { 
					$scope.user = response.data;
					console.log($scope.user)
					updatePicture($scope.user);
				});
		}

		function updatePicture(user) {
			user.Picture = user.picture.data.url;
			user.FacebookId = user.id;

			HomeService.updatePicture(user)
						.then(response => console.log(response))
						.catch(error => console.log(error));	
		}

	});