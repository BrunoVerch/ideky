angular
	.module('app.core')
	.controller('GameController', function ($rootScope, $scope, $window, $q, GameService, toastr) {
			
		init();

		$scope.start = () => {
			loadFriends()
				.then(response => {
					if(response.data.length < 150) {
						toastr.error('Você precisa de pelo menos 150 amigos para jogar.');
						return;
					}

					$scope.friends = shuffle(response.data);
				});
		}

		function init() {
			loadUser();
		}

		function loadUser() {
			$rootScope.sdkLoad
				.then(() => {
					GameService.getUser()
						.then(response => $scope.user = response.data);
				});
		}

		function loadFriends() {
			const deffered = $q.defer();
			let friends;

			$rootScope.sdkLoad
				.then(response => {
					GameService.getFriends()
						.then(response => deffered.resolve(response));
				});

				return deffered.promise;
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