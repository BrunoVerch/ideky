angular
	.module('app.core')
	.controller('HomeController', function ($scope, $location, HomeService, toastr, GameService, $localStorage,$timeout,$interval,RankingService) {

		let textAnimationClasses;
		let textAnimationCounter;
		let	textAnimationInterval;

		$scope.hasPicture = hasPicture;
		init();
		
		function init() {
			if(typeof $localStorage.User != 'undefined' && $localStorage.User != null ){
				$scope.user = $localStorage.User;
			}
			loadUser();
			loadFriend();
		}
		
		$scope.start = () => {
			$scope.friends = $localStorage.FriendsData;			 
			if(typeof $scope.friends === 'undefined' || $scope.friends === null){
				$timeout($scope.start,500);
			}else if($scope.friends.length < 150){
				toastr.error('Você precisa de pelo menos 150 amigos para jogar.');
				$location.path('/home');
				return;
		 	}else{
				$location.path('/game');
			}
		}

		function logout(){
			$location.path('/login');
		}

		function loadFriend() {
	  	GameService.getFriends().then(responseInvitable => {
				const invitableFriends = responseInvitable.data;
				
				GameService.getFriendsWhoPlayIdek().then(response => {
					const friends = response.data;
					const allFriends = invitableFriends.concat(response.data);
					$localStorage.FriendsData = allFriends;
					
					RankingService.getFriendsRanking(friends).then(response => $localStorage.RankingFriends = response.data);
				});
			});
		}

		function loadUser() {
			HomeService.getUser()
				.then(response => { 
					$scope.user = response.data;
					$localStorage.User = $scope.user;

					updatePicture($scope.user);
				});
		}

		function hasPicture(url){
			if(typeof url !== 'undefined' && url != null && url !== "" ){
				return true;
			}
			return false;
		}
		function updatePicture(user) {
			HomeService.updatePicture(user)
				.catch(error => console.log(error));	
		}
	});