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
		let userUsedLife;
		
		init();

		function init() {	
			userUsedLife = false;
			startScopeElements();
			shuffleAllFriends();
			if(getLocalStorageUser()){
				loadLevelsAndStartGame();
			}else{
				$location.path('/login');
			}
		}

		function loadLevelsAndStartGame(){
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
			$scope.onClickButtonLifes = onClickButtonLifes;
			$scope.share = share;

			$scope.fase = 0;
		    $scope.score = 0;
			$scope.currentLevel = {};
			$scope.currentLevel.LevelNumber = 0;
			$scope.timer = 0;
			$scope.currentStage = 0;
			$scope.rightFriend = {};
			$scope.rightFriend.Name = '...';
			$scope.drawFriends = [];
			$scope.user = {};
			$scope.endMessage;
		}

		function getLocalStorageUser(){
			user = $localStorage.User;
			if(typeof $scope.friends === 'undefined' || $scope.friends === null || typeof user === 'undefined'|| user === null){
				toastr.error("Ocorreu um erro ao carregar seu perfil. Redirecionando...");
				return false;	
			}
			return true;
		}

		function loadUser() {
			HomeService.getUser()
				.then(response => { 
					$localStorage.User = response.data;
					user = response.data.data;
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
			$scope.drawFriends.splice(0,$scope.drawFriends.length);
			let pictureAmount = $scope.currentLevel.PictureAmount;
			for(let i=0; i<pictureAmount;i++){
				let drawNumber = Math.floor(Math.random() * $scope.friends.length);
				let regex = /\^|\~|\'|\"|\´|\`|\\|\/|\;|\{|\}|\@|\||\<|\>/g;
				if(!$scope.friends[drawNumber].picture.data.is_silhouette){ 
					let userTemp = {};
					userTemp.Picture = $scope.friends[drawNumber].picture.data.url;
					userTemp.Name = $scope.friends[drawNumber].name.replace(regex,"");
					$scope.drawFriends.push(userTemp);
				}else{
					i--;
				}
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
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;	
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
				if(name === $scope.rightFriend.Name){
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
				if(name === $scope.rightFriend.Name && $scope.timer > 0){
					result = 'right';
					$timeout(nextStage,waitTimeBetweenStages);	
				}else{
					result = 'wrong';
					wrongName = name;
					$scope.endMessage = "Game Over!";
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
				$scope.endMessage = "Time Over!";
				$scope.timer--;
				$timeout(finish, waitTimeBetweenStages);
			}			
		}

		function onClickButtonLifes(bool){
			if(bool === true){
				userUsedLife = true;
				user.Lifes--;
				GameService.reduceLife(user)
					.then(response => {
						$localStorage.User = response.data.data;
						user = response.data.data;
						$scope.showLifesOption = false;
						startGame();
					})
					.catch(error => console.log(error));
			}else{
				$scope.showLifesOption = false;
				endGame();
			}
		}

		function finish(){
			if(user.Lifes>0 && userUsedLife === false){
				$scope.lifes = user.Lifes;
				$scope.showLifesOption = true;
			}else{
				endGame();
			}
		}

		function endGame(){
			let gameResult = {'FacebookId':user.FacebookId,'Score':$scope.score};
			GameService.saveGameResult(gameResult);
			if(gameResult.score > user.Record){
				$localStorage.User.Record = gameResult.score;
			}
			loadUser();
			$scope.shareButton = true;
		}

		function startProgressBarStages(){
			countStage = $scope.currentStage-1;
			progressBarStages();
		}

		function startProgressBarTimer(){
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

		function share(){
			FB.ui({
				method: 'share',
				mobile_iframe: true,
				action_type: 'og.likes',
				action_properties: JSON.stringify({
					object:'https://developers.facebook.com/docs/',
				})
			}, function(response){});
		}
	});