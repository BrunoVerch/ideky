angular
	.module('app.core')
	.controller('GameController', function ($rootScope, $scope, $window, $location, $q, GameService, toastr) {
			
		init();

		function init() {
			loadFriends()
				.then(response => {
					if(response.data.length < 150) {
						toastr.error('Você precisa de pelo menos 150 amigos para jogar.');
						$location.path('/home');
						return;
					}

					$scope.friends = shuffle(response.data);
					console.log($scope.friends);
				});
		}

		function loadFriends() {
			const deffered = $q.defer();
			let friends;
			
			GameService.getFriends()
				.then(response => deffered.resolve(response));
				
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