angular
	.module('app.core')
	.controller('GameController', function ($scope, $window, $location, $q, GameService, toastr, $interval,$timeout,$localStorage,HomeService ) {
		
		let waitTimeBetweenStages = 250;
		let waitTimeBeforeEndsGame = 1500;
		let currentLevelIndex;
		let countStage;
		let countTime;
		let progressBarTimeOut;
		let wrongName;
		let result;
	    let percentageTime;
		let intervalTimer;
		let textAnimationClasses;
		let textAnimationInterval;
		let textAnimationCounter;
		let startCountClasses;
		let startCounter;
		let user;
		
		init();

		function init() {	
			startScopeElements();
			shuffleAllFriends();
			getLocalStorageUser();
			GameService.getLevels()
				.then(responseLevels => {
					levels = responseLevels.data.data;
					currentLevelIndex = 0;
					$scope.currentStage = 1;
					$scope.currentLevel = levels[currentLevelIndex];
					startGame();
				})
				.catch(error => console.log(error))
		}

		function startScopeElements(){
			$scope.changeClass = changeClass;
			$scope.answer =  answer;

			$scope.fase = 0;
		    $scope.score = 0;
			$scope.currentLevel = {};
			$scope.currentLevel.LevelNumber = 0;
			$scope.timer = 0;
			$scope.currentStage = 0;
			$scope.rightFriend = {};
			$scope.rightFriend.name = '...';
		}

		function getLocalStorageUser(){
			user = $localStorage.User;
			if(typeof $scope.friends === 'undefined' || $scope.friends === null || typeof user === 'undefined'|| user === null){
				toastr.error("Ocorreu um erro ao carregar seu perfil. Redirecionando...");
				$location.path('/login');	
			}
		}

		function loadUser() {
			HomeService.getUser()
				.then(response => { 
					$localStorage.User = $scope.user;
				});
		}

		function nextStage(){
			stopTimer();
			sumScore();
			if($scope.currentStage >= 5){
				nextLevel();
			}else{
				$scope.currentStage++;
			}				
			startGame();
		}

		function nextLevel(){		
			if(currentLevelIndex<9){
				currentLevelIndex++;			
			}		
			$scope.currentLevel = levels[currentLevelIndex];	
			$scope.currentStage = 1;		
		}

		function startGame(){
			result = 'pendent';
			setDrawsFriends();
			startProgressBarStages();
			startTimer();
			startProgressBarTimer();
		}

		function setDrawsFriends(){
			$scope.drawFriends = [];
			let pictureAmount = $scope.currentLevel.PictureAmount;
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

		function shuffleAllFriends() {
			let array = $localStorage.FriendsData;
			let currentIndex = array.length, temporaryValue, randomIndex;
			while (0 !== currentIndex) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;
				if(array[currentIndex].picture.data.is_silhouette === false){
					temporaryValue = array[currentIndex];
					array[currentIndex] = array[randomIndex];
					array[randomIndex] = temporaryValue;
				}		
			}
			$scope.friends = array;
		}

		function sumScore(){
			$scope.score = $scope.score+(100*$scope.currentLevel.Multiplier);
		}

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

		function answer(name){
			stopTimer();
			if(result === 'pendent'){
				if(name === $scope.rightFriend.name && $scope.timer > 0){
					result = 'right';
					$timeout(nextStage,waitTimeBetweenStages);	
				}else{
					result = 'wrong';
					wrongName = name;
					$timeout(finish, waitTimeBetweenStages);
				}
			}
		}

		function startTimer(){
			$scope.timer = $scope.currentLevel.Duration;
			intervalTimer = $interval(timer,1000);
		}

		function stopTimer(){
			$timeout.cancel(progressBarTimeOut);
			$interval.cancel(intervalTimer);
		}

		function timer(){
			if($scope.timer>1){
				$scope.timer--;
			}else if(result === 'pendent'){
				stopTimer();
				result = 'endOfTime';
				toastr.error("Time over!");
				$scope.timer--;
				$timeout(finish, waitTimeBetweenStages);
			}			
		}

		function onClickButtonLifes(bool){
			if(bool === true){
				user.lifes--;
				startGame();
			}else{
				endGame();
			}
		}

		function finish(){
			if(user.lifes>0){
				$scope.lifes = user.lifes;
				$scope.showLifesOption = true;
			}else{
				endGame();
			}
		}

		function endGame(){
			let gameResult = {'FacebookId':user.id,'Score':$scope.score};
			GameService.saveGameResult(gameResult);
			if(gameResult.score > user.record){
				$localStorage.User.record = gameResult.score;
			}
			loadUser();
			toastr.error("Game Over!");
			$timeout(returnHome,waitTimeBeforeEndsGame);
		}

		function returnHome(){
			$location.path('/home');
		}

		function startProgressBarStages(){
			countStage = $scope.currentStage-1;
			progressBarStages();
		}

		function startProgressBarTimer(){
			console.log('oi');
			countTime = 100;
			percentageTime = (0.1*100)/$scope.currentLevel.Duration; //Define quanto em porcentagem equivale 100ms sobre o total de segundos da fase
			progressBarTimer();
		}

		function progressBarStages(){
			$scope.stagePercentage = {'width':(countStage*20)+'%'};
			if(countStage<$scope.currentStage){
				countStage = countStage +0.1;
				$timeout(progressBarStages,25);
			}
		}

		function progressBarTimer(){
			$scope.timerPercentage = {'width': (countTime)+'%'};
			if(countTime>0){
				countTime = countTime - percentageTime;
				progressBarTimeOut = $timeout(progressBarTimer,98);
		  	}
    	}		
	});