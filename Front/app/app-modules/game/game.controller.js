angular
	.module('app.core')
	.controller('GameController', function ($rootScope, $scope, $window, $location, $q, GameService, toastr, $interval,$timeout) {
		let users = [{id:1, nome:'João', img:'http://www.jarisk.com/img/tux.png'},{id:2, nome:'Pedro',img:'http://www.jarisk.com/img/tux.png'},{id:3, nome:'Joaquim',img:'http://www.jarisk.com/img/tux.png'},{id:4, nome:'Julia',img:'http://www.jarisk.com/img/tux.png'},{id:5, nome:'Juliana',img:'http://www.jarisk.com/img/tux.png'},{id:6, nome:'Alexandra',img:'http://www.jarisk.com/img/tux.png'},{id:7, nome:'Mariana',img:'http://www.jarisk.com/img/tux.png'},{id:8, nome:'Pietra',img:'http://www.jarisk.com/img/tux.png'},{id:9, nome:'Arthur',img:'http://www.jarisk.com/img/tux.png'},{id:10, nome:'Felipe',img:'http://www.jarisk.com/img/tux.png'},{id:11, nome:'Gabriella',img:'http://www.jarisk.com/img/tux.png'},{id:12, nome:'Nathy',img:'http://www.jarisk.com/img/tux.png'},{id:13, nome:'Fernanda',img:'http://www.jarisk.com/img/tux.png'},{id:14, nome:'Poster',img:'http://www.jarisk.com/img/tux.png'},{id:15, nome:'Uma pessoa muito humana',img:'http://www.jarisk.com/img/tux.png'}];
		//init();
		let levels = [{LevelNumber: 1, PictureAmount: 2, Duration: 10, Multiplier: 1},{LevelNumber: 2, PictureAmount: 4, Duration: 8, Multiplier: 2},{LevelNumber: 3, PictureAmount: 5, Duration: 6, Multiplier: 3},{LevelNumber: 4, PictureAmount: 6, Duration: 6, Multiplier: 4},{LevelNumber: 5, PictureAmount: 8, Duration: 6, Multiplier: 5},{LevelNumber: 6, PictureAmount: 10, Duration: 5, Multiplier: 6},{LevelNumber: 7, PictureAmount: 12, Duration: 5, Multiplier: 7},{LevelNumber: 8, PictureAmount: 12, Duration: 4, Multiplier: 8},{LevelNumber: 9, PictureAmount: 13, Duration: 4, Multiplier: 9},{LevelNumber: 10, PictureAmount: 15, Duration: 3, Multiplier: 10}];
		let levelAtual = 0;
		let level = levels[0];
		$scope.selectedUsers = [];
		$scope.rightName = "Pedro";
		let wrongName = null;
		let result = 'pendent';
		let waitTime = 500;
		let timer = level.Duration;
		let interval = $interval(lessTime,1000);
		let finishCount = 0;
		selectFriends();
		function nextLevel(){
			$interval.cancel(interval);
			result = 'pendent';
			finishCount = 0;
			if(levelAtual<9){
				levelAtual++;			
			}		
			level = levels[levelAtual];
			timer = level.Duration;
			selectFriends();	
			interval = $interval(lessTime,1000);		
		}
		$scope.changeClass = changeClass;
		function changeClass(name){
			if(result === 'pendent'){
				return 'moviment-to-button';
			}
			if(result === 'endOfTime'){
				return 'game-button-general-answer';
			}
			if(result === 'right'){
				if(name === $scope.rightName){
					return 'game-button-right-answer';
				}
				return 'game-button-general-answer';
			}
			if(result === 'wrong'){
				if(name === wrongName){
					return 'game-button-wrong-answer';
				}
				return 'game-button-general-answer';
			}
		}
		$scope.answer =  answer;
		function answer(name){
			if(result === 'pendent'){
				if(name === $scope.rightName){
					result = 'right';
					$timeout(nextLevel,waitTime);
				}else{
					$timeout(finish, waitTime);
					wrongName = name;
					result = 'wrong';
				}
			}
		}
		function finish(){
			$interval.cancel(interval);
			toastr.error("Game Over!");
		}
		function selectFriends(){
			$scope.selectedUsers = [];
			for(let i = 0; i<level.PictureAmount; i++){
				$scope.selectedUsers.push(users[i]);
			}
		}
		function lessTime(){
			if(timer>0){
				timer--;
			}else if(finishCount === 0){
				result = 'endOfTime';
				toastr.error("Você perdeu!");
				finishCount = 1;
			}			
		}
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