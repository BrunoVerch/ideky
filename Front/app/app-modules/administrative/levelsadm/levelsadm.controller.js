angular
	.module('app.core')
	.controller('LevelsadmController', function ($scope, AdministrativeService, GameService, toastr) {

		$scope.loadLevel = level => $scope.level = $scope.levels[level-1];

		(getLevels = () => {
			GameService.getLevels()
				.then(response => { 
					$scope.levels = response.data.data; 
					console.log(response.data)
				})
				.catch(error => console.log(error))
		})()		
		
		$scope.editLevel = level => {
			console.log("entrei")
			AdministrativeService.editLevel(level)
				.then(response => {
					console.log(response)
				})
				.catch(error => console.log(error));
		}
});