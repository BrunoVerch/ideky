angular
	.module('app.core')
	.controller('MenuadmController', function ($scope, AdministrativeService, toastr) {
		$scope.confirmar = false;
		$scope.mostrarConfirmar = () => { $scope.confirmar = !$scope.confirmar;}
		
		$scope.resetRanking = () => {
			AdministrativeService.resetRanking()
				.then(() => { $scope.mostrarConfirmar(); })
				.catch(error => console.log(error));
		}
	});