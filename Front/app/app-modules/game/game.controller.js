angular
	.module('app.core')
	.controller('GameController', function ($scope, $window, $location, $q, GameService, toastr, $interval,$timeout,$localStorage,HomeService ) {
		
		let currentLevel;
		let countStage;
		let countTime;
		let progressBarTimeOut;
		let wrongName;
		let result;
		let waitTimeBetweenStages;
		let percentageTime;
		let interval;
		let textAnimationClasses;
		let textAnimationInterval;
		let textAnimationCounter;
		let startCountClasses;
		let startCounter;
		let user;
		
		init();

		function init() {	
			startScopeElements();
			$scope.friends = shuffle($localStorage.FriendsData);
			user = $localStorage.User;
			if(typeof $scope.friends === 'undefined' || $scope.friends === null || typeof user === 'undefined'|| user === null){
				toastr.error("Ocorreu um erro ao carregar seu perfil. Redirecionando...");
				$location.path('/login');	
			}
			GameService.getLevels()
				.then(responseLevels => {
					levels = responseLevels.data.data;
					currentLevel = 0;
					$scope.currentStage = 1;
					countStage = 0;
					$scope.level = levels[currentLevel];
					countTime = 100;
					waitTimeBetweenStages = 250;
					result = 'pendent';
					$scope.timer = $scope.level.Duration;
					percentageTime = (0.1*100)/$scope.level.Duration;
					setDrawsFriends();
					updateProgressBarStages();	
					updateProgressBarTimer();
					interval = $interval(timer,1000);
				})
				.catch(error => console.log(error))
		}

		function startScopeElements(){
			$scope.fase = 0;
		    $scope.score = 0;
			$scope.level = {};
			$scope.level.LevelNumber = 0;
			$scope.timer = 0;
			$scope.currentStage = 0;
			$scope.rightFriend = {};
			$scope.rightFriend.name = '...';
		}

		function sumScore(){
			$scope.score = $scope.score+(100*$scope.level.Multiplier);
		}	

		function nextLevel() {
			$interval.cancel(interval);
			sumScore();			
			result = 'pendent';
			if(currentLevel<9){
				currentLevel++;			
			}		
			$scope.level = levels[currentLevel];	
			$scope.timer = $scope.level.Duration;
			countTime = 100;
			setDrawsFriends();	
			$scope.currentStage = 1;
			countStage = 0;
			updateProgressBarStages();
			percentageTime = (0.1*100)/$scope.level.Duration; //Define quantos porcento equivalem 100ms sobre o total de segundos da fase
			interval = $interval(timer,1000);
			countTime = 100;
			updateProgressBarTimer();			
		}

		function nextStage(){
			console.log('nextStage');
			$interval.cancel(interval);
			sumScore();
			result = 'pendent';
			$scope.currentStage++;
			updateProgressBarStages();
			$scope.timer = $scope.level.Duration;
			setDrawsFriends();	
			interval = $interval(timer,1000);
			countTime = 100;
			updateProgressBarTimer();	
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
				if(name === $scope.rightFriend.name){
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
				if(name === $scope.rightFriend.name && $scope.timer > 0){
					$timeout.cancel(progressBarTimeOut);
					result = 'right';
					if($scope.currentStage < 5){
						$timeout(nextStage,waitTimeBetweenStages);
					}else{
						$timeout(nextLevel,waitTimeBetweenStages);
					}		
				}else{
					$timeout.cancel(progressBarTimeOut);
					$timeout(finish, waitTimeBetweenStages);
					wrongName = name;
					result = 'wrong';
				}
			}
		}

		function finish(){
			$interval.cancel(interval);
			let gameResult = {'FacebookId':user.id,'Score':$scope.score};
			GameService.saveGameResult(gameResult);
			loadUser();
			toastr.error("Game Over!");
			$timeout(redirect,1500);
		}

		function redirect(){
			$location.path('/home');
		}

		function loadUser() {
			HomeService.getUser()
				.then(response => { 
					$localStorage.User = $scope.user;
				});
		}

		function timer(){
			if($scope.timer>1){
				$scope.timer--;
			}else if(result === 'pendent'){
				result = 'endOfTime';
				toastr.error("Time over!");
				$scope.timer--;
				$timeout(finish, waitTimeBetweenStages);
			}			
		}

		function setDrawsFriends(){
			$scope.drawFriends = [];
			let pictureAmount = $scope.level.PictureAmount;
			for(let i=0; i<pictureAmount;i++){
				let drawNumber = Math.floor(Math.random() * $scope.friends.length);
				let regex = /\^|\~|\'|\"|\´|\`|\\|\/|\;|\{|\}|\@|\||\<|\>/g; 
				let user = $scope.friends[drawNumber];
				user.name = user.name.replace(regex,"");
				$scope.drawFriends.push(user);
			}
			let drawNumber = Math.floor(Math.random() * $scope.drawFriends.length); 
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

		function updateProgressBarStages(){
			$scope.stagePercentage = {'width':(countStage*20)+'%'};
			if(countStage<$scope.currentStage){
				countStage = countStage +0.1;
				$timeout(updateProgressBarStages,25);
			}
		}

		function updateProgressBarTimer(){
			$scope.timerPercentage = {'width': (countTime)+'%'};
			if(countTime>0){
				countTime = countTime - percentageTime;
				progressBarTimeOut = $timeout(updateProgressBarTimer,100);
		  	}
    	}		
	});