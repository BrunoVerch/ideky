angular
	.module('app.core')
	.controller('LifesadmController', function ($scope, AdministrativeService, toastr) {
		
		// FacebookId e número de vidas
		$scope.addLifes = userLifes => {
			AdministrativeService.addLifes(userLifes)
				.then(response)
				.catch(error => console.log(error))
		}
});