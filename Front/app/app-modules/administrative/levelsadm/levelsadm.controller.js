angular
	.module('app.core')
	.controller('LevelsadmController', function ($scope, AdministrativeService, GameService, toastr) {
		
		$scope.getLevels = () => {
			GameService.getLevels()
				.then(response => console.log(response.data))
				.catch(error => console.log(error))
		}		
		
		$scope.editLevel = level => {
			AdministrativeService.editLevel(level)
				.then(response)
				.catch(error => console.log(error));
		}
});