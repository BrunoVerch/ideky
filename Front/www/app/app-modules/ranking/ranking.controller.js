angular
	.module('app.core')
	.controller('RankingController', function ($scope, $location, RankingService) {
	  init();

		function init() {
			console.log('teste')
			RankingService.getDailyRank()
				.then(response => $scope.daily = respose.data.data)
				.catch(error => console.log(error));

			RankingService.getMothlyRank()
				.then(response => $scope.month = respose.data.data)
				.catch(error => console.log(error));

			RankingService.getOverallRank()
				.then(response => $scope.total = respose.data.data)
				.catch(error => console.log(error));
		}
	});