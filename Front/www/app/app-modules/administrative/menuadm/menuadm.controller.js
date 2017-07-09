angular
	.module('app.core')
	.controller('MenuadmController', function ($scope, AdministrativeService, toastr) {
		$scope.confirm = false;
		$scope.replaceConfirm = () => { $scope.confirm = !$scope.confirm;}
		
		$scope.resetRanking = () => {
			AdministrativeService.resetRanking()
				.then(() => { $scope.replaceConfirm(); })
				.catch(error => console.log(error));
		}
	});