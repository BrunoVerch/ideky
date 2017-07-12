angular
	.module('app.core')
	.controller('MenuadmController', function ($scope, AdministrativeService, toastr, $location) {
		$scope.confirm = false;
		$scope.replaceConfirm = () => { $scope.confirm = !$scope.confirm;}
		
		$scope.resetRanking = () => {
			AdministrativeService.resetRanking()
				.then(() => { 
					toastr.success("Resetado com sucesso!"); 
					$scope.replaceConfirm(); 
				})
				.catch(error => {
					toastr.error("Falha ao resetar, tente mais tarde!");
					console.log(error);
				});
		}

		$scope.redirect = givenPath => $location.path(givenPath);
	});