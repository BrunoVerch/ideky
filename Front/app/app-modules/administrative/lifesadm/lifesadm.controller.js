angular
	.module('app.core')
	.controller('LifesadmController', function ($scope, AdministrativeService, toastr) {
		
		// FacebookId e número de vidas
		$scope.addLifes = userLifes => {
			AdministrativeService.addLifes(userLifes)
				.then(response => {
					$scope.user = {};
					toastr.success(`Você acabou de doar ${userLifes} vidas!`);
				})
				.catch(error => {
					toastr.error('Houve um problema ao dar vidas para esse usuário, tente mais tarde!');
					console.log(error);
				})
		}
});