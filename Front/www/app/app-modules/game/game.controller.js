angular
	.module('app.core')
	.controller('GameController', function ($rootScope, $scope, $window, $location, $q, GameService, toastr) {
			
		init();
		$scope.levels = [];
		let levelNumber = 0;
		$scope.level;
		$scope.nextLevel = nextLevel;
		$scope.drawFriends = [];
		$scope.friends = [];
		$scope.rightFriend = {};

		function init() {
			loadFriends()
				.then(response => {
					if(response.data.length < 150) {
						toastr.error('Você precisa de pelo menos 150 amigos para jogar.');
						$location.path('/home');
						return;
					}
					GameService.getLevels()
					 	.then(levelResponse =>{
					 		$scope.levels = levelResponse.data.data;							
					 		$scope.friends = shuffle(response.data);
					 		$scope.level = $scope.levels[levelNumber];
							setDrawsFriends($scope.level.PictureAmount);
					 	})
				});
		}

		function loadFriends() {
			const deffered = $q.defer();
			let friends;
			
			GameService.getFriends()
				.then(response => deffered.resolve(response));

				return deffered.promise;
		}

		function nextLevel(){
			$scope.friends = shuffle($scope.friends);
			if(levelNumber<10){
				levelNumber++;
				$scope.level = $scope.levels[levelNumber];
				getDrawsFriends($scope.level.PictureAmount);
			}
		}

		function setDrawsFriends(pictureAmount){
			for(let i=0; i<pictureAmount;i++){
				let drawNumber = Math.floor(Math.random() * pictureAmount); 
				$scope.drawFriends.push($scope.friends[i]);
				console.log($scope.friends[i]);
			}
			let drawNumber = Math.floor(Math.random() * pictureAmount); 
			$scope.rightFriend = $scope.drawFriends[drawNumber];
		}

		function shuffle(array) {
			var currentIndex = array.length, temporaryValue, randomIndex;
			while (0 !== currentIndex) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;
				if(array[currentIndex].picture.data.is_silhouette === false){
					temporaryValue = array[currentIndex];
					array[currentIndex] = array[randomIndex];
					array[randomIndex] = temporaryValue;
				}		
			}
			return array;
		}

		function getLevels(){
			
		}
	});