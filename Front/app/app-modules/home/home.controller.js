angular
	.module('app.core')
	.controller('HomeController', function ($scope, $location, HomeService, toastr, GameService, $localStorage,$timeout,$interval) {
	  
	  	GameService.getFriends().then( response=>{
			$localStorage.FriendsData = response.data;
		});
		
		let textAnimationClasses;
		let textAnimationCounter;
		let	textAnimationInterval;

		init();
		
		function init() {
			loadUser();
		}
		
		$scope.start = () => {
			$scope.friends = $localStorage.FriendsData;			 
			if(typeof $scope.friends === 'undefined' || $scope.friends === null){
				turnOnLoadingScreen();
				startTextAnimation(500);
				$timeout($scope.start,500);
				$timeout(logout,5000);
			}else if($scope.friends.length < 150){
				toastr.error('Você precisa de pelo menos 150 amigos para jogar.');
				$location.path('/home');
				return;
		 	}else{
				stopTextAnimation();
				turnOffLoadingScreen();
				$location.path('/game');
			}
		}

		function logout(){
			$location.path('/login');
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

		function turnOnLoadingScreen(){
			$scope.loadingClass = 'loadingScreenOn';
		}

		function turnOffLoadingScreen(){
			$scope.loadingClass = 'loadingScreenOff';
		}

		function startTextAnimation(delay){
			textAnimationClasses = ['loadingTextStep1','loadingTextStep2','loadingTextStep3','loadingTextStep4'];
			textAnimationCounter = 0;
			textAnimationInterval = $interval(loadingTextAnimation,delay);
		}
		
		function loadingTextAnimation(){
			if(textAnimationCounter < textAnimationClasses.length){
				$scope.loadingText = textAnimationClasses[textAnimationCounter];
				textAnimationCounter++;
			}else{
				textAnimationCounter = 0;
			}
		}
		function stopTextAnimation(){
			$interval.cancel(textAnimationInterval);
		}

	});