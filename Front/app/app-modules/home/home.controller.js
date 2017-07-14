angular
	.module('app.core')
	.controller('HomeController', function ($scope, $location, HomeService, toastr, GameService, $localStorage,$timeout,$interval,RankingService) {
	  
	  	GameService.getFriends().then( responseInvitable=>{
			invitableFriends = responseInvitable.data;
			GameService.getFriendsWhoPlayIdek().then(response=>{
				friends =  response.data;
				allFriends = invitableFriends.concat(friends);
                $localStorage.FriendsData = allFriends;
				RankingService.getFriendsRanking(friends).then(response=>{
					$localStorage.RankingFriends = response.data;
				});
			})
		});

		let textAnimationClasses;
		let textAnimationCounter;
		let	textAnimationInterval;

		init();
		
		function init() {
			if(typeof $localStorage.User != 'undefined' && $localStorage.User != null ){
				$scope.user = $localStorage.User;
			}
			loadUser();
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
		function loadUser() {
			HomeService.getUser()
				.then(response => { 
					$scope.user = response.data;
					$localStorage.User = $scope.user;
					updatePicture($scope.user);
				});
		}

		function updatePicture(user) {
			HomeService.updatePicture(user)
						.catch(error => console.log(error));	
		}
	});