angular
	.module('app.core')
	.controller('GameController', function ($rootScope, $scope, $window, $location, $q, GameService, toastr, $interval,$timeout) {
		let users = [{id:1, nome:'Fulano Pereira Pereira Pereira Pereira', img:'http://www.jarisk.com/img/tux.png'},{id:2, nome:'Pedro',img:'http://www.jarisk.com/img/tux.png'},{id:3, nome:'Joaquim',img:'http://www.jarisk.com/img/tux.png'},{id:4, nome:'Julia',img:'http://www.jarisk.com/img/tux.png'},{id:5, nome:'Juliana',img:'http://www.jarisk.com/img/tux.png'},{id:6, nome:'Alexandra',img:'http://www.jarisk.com/img/tux.png'},{id:7, nome:'Mariana',img:'http://www.jarisk.com/img/tux.png'},{id:8, nome:'Pietra',img:'http://www.jarisk.com/img/tux.png'},{id:9, nome:'Arthur',img:'http://www.jarisk.com/img/tux.png'},{id:10, nome:'Felipe',img:'http://www.jarisk.com/img/tux.png'},{id:11, nome:'Gabriella',img:'http://www.jarisk.com/img/tux.png'},{id:12, nome:'Nathy',img:'http://www.jarisk.com/img/tux.png'},{id:13, nome:'Fernanda',img:'http://www.jarisk.com/img/tux.png'},{id:14, nome:'Poster',img:'http://www.jarisk.com/img/tux.png'},{id:15, nome:'Uma pessoa muito humana',img:'http://www.jarisk.com/img/tux.png'}];
		//init();
		let levels = [{LevelNumber: 1, PictureAmount: 2, Duration: 10, Multiplier: 1},{LevelNumber: 2, PictureAmount: 4, Duration: 8, Multiplier: 2},{LevelNumber: 3, PictureAmount: 5, Duration: 6, Multiplier: 3},{LevelNumber: 4, PictureAmount: 6, Duration: 6, Multiplier: 4},{LevelNumber: 5, PictureAmount: 8, Duration: 6, Multiplier: 5},{LevelNumber: 6, PictureAmount: 10, Duration: 5, Multiplier: 6},{LevelNumber: 7, PictureAmount: 12, Duration: 5, Multiplier: 7},{LevelNumber: 8, PictureAmount: 12, Duration: 4, Multiplier: 8},{LevelNumber: 9, PictureAmount: 13, Duration: 4, Multiplier: 9},{LevelNumber: 10, PictureAmount: 15, Duration: 3, Multiplier: 10}];
		let currentLevel = 0;
		$scope.currentStage = 1;
		let countStage = 0;
		$scope.level = levels[0];
		$scope.fase = 0;
		$scope.score = 0;
		let countTime = 100;
		let progressBarTimeOut;
		updateProgressBarStages();
		$scope.selectedUsers = [];
		$scope.rightName = "Fulano Pereira Pereira Pereira Pereira";
		let wrongName = null;
		let result = 'pendent';
		let waitTime = 500;
		$scope.timer = $scope.level.Duration;
	    let percentageTime = (0.1*100)/$scope.level.Duration;
		updateProgressBarTimer();
		let interval = $interval(timer,1000);
		selectFriends();
		function sumScore(){
			$scope.score = $scope.score+(100*$scope.level.Multiplier);
		}	
		function nextLevel(){
			$interval.cancel(interval);
			sumScore();			
			result = 'pendent';
			if(currentLevel<9){
				currentLevel++;			
			}		
			$scope.level = levels[currentLevel];	
			$scope.timer = $scope.level.Duration;
			countTime = 100;
			selectFriends();	
			$scope.currentStage = 1;
			countStage = 0;
			updateProgressBarStages();
			percentageTime = (0.1*100)/$scope.level.Duration; //Define quantos porcento equivalem 100ms sobre o total de segundos da fase
			interval = $interval(timer,1000);
			updateProgressBarTimer();
			countTime = 100;		
		}
		function nextStage(){
			$interval.cancel(interval);
			sumScore();
			result = 'pendent';
			$scope.currentStage++;
			updateProgressBarStages();
			$scope.timer = $scope.level.Duration;
			selectFriends();	
			interval = $interval(timer,1000);
			updateProgressBarTimer();
			countTime = 100;
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
				if(name === $scope.rightName && $scope.timer > 0){
					$timeout.cancel(progressBarTimeOut);
					result = 'right';
					if($scope.currentStage < 5){
						$timeout(nextStage,waitTime);
					}else{
						$timeout(nextLevel,waitTime);
					}		
				}else{
					$timeout.cancel(progressBarTimeOut);
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
			for(let i = 0; i<$scope.level.PictureAmount; i++){
				$scope.selectedUsers.push(users[i]);
			}
		}
		function timer(){
			if($scope.timer>1){
				$scope.timer--;
			}else if(result === 'pendent'){
				console.log("Acabou o tempo");
				result = 'endOfTime';
				toastr.error("Você perdeu!");
				$scope.timer--;
				$interval.cancel(interval);
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
		function updateProgressBarStages(){
			$scope.stagePercentage = {'width':(countStage*20)+'%'};
			if(countStage<$scope.currentStage){
				countStage = countStage +0.1;
				$timeout(updateProgressBarStages,25);
			}
		}
		function updateProgressBarTimer(){
			console.log(countTime);
			$scope.timerPercentage = {'width': (countTime)+'%'};
			if(countTime>0){
				countTime = countTime - percentageTime;
				progressBarTimeOut = $timeout(updateProgressBarTimer,100);
			}
		}
	});