angular
	.module('app.core')
	.controller('RankingController', function ($scope, $location, RankingService) {
	  init();

		function init() {
			RankingService.getDailyRank()
				.then(response => $scope.daily = response.data.data)
				.catch(error => console.log(error));

			RankingService.getMothlyRank()
				.then(response => $scope.month = response.data.data)
				.catch(error => console.log(error));

			RankingService.getOverallRank()
				.then(response => { $scope.total = response.data.data; console.log(response.data.data); })
				.catch(error => console.log(error));
		}
	});