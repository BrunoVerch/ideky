angular
	.module('app.core')
	.controller('RankingController', function ($scope, $location, RankingService) {
		$scope.daily;
		$scope.month;  
		$scope.total;
		init();

		$scope.play = () => $location.path('/game');
		
		function init() {
			RankingService.getDailyRank()
				.then(response => { $scope.daily = response.data.data;})
				.catch(error => console.log(error));

			RankingService.getMothlyRank()
				.then(response => $scope.month = response.data.data)
				.catch(error => console.log(error));

			RankingService.getOverallRank()
				.then(response => { $scope.total = response.data.data;})
				.catch(error => console.log(error));
		}
	});