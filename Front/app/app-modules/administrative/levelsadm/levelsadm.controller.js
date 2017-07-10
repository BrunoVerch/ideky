angular
	.module('app.core')
	.controller('LevelsadmController', function ($scope, AdministrativeService, toastr) {
		
		// FacebookId e número de vidas
		$scope.addLifes = userLifes => {
			AdministrativeService.addLifes(userLifes)
				.then(response)
				.catch(error => console.log(error))
		}

		$scope.editLevel = level => {
			AdministrativeService.editLevel(level)
				.then(response)
				.catch(error => console.log(error));
		}

		$scope.resetRanking = () => {
			AdministrativeService.resetRanking()
				.then(response)
				.catch(error => console.log(error));
		}

});