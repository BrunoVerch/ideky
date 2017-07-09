angular
	.module('app.core')
	.controller('GameController', function ($rootScope, $scope, $window, $q, GameService, toastr) {
			
		$scope.start = () => {
			loadFriends()
				.then(response => {
					if(response.data.length < 150) {
						toastr.error('Você precisa de pelo menos 150 amigos para jogar.');
						return;
					}

					$scope.friends = shuffle(response.data);
					console.log($scope.friends);

				});
		}

		function loadFriends() {
			const deffered = $q.defer();
			let friends;

			$rootScope.sdkLoad
				.then(response => {
					GameService.getFriends('friends', response => {
						friends = response.data;

						GameService.getFriends('invitable_friends', 
							res => { 
								friends = friends.concat(res.data);
								deffered.resolve({ data: friends });
							});
					});
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