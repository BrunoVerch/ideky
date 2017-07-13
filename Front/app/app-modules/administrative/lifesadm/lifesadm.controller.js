angular
	.module('app.core')
	.controller('LifesadmController', function ($scope, AdministrativeService, toastr, authService, $location) {
		if(!authService.isAuthenticated()){
			$location.path('/loginadm');
		}
		// FacebookId e número de vidas
		$scope.addLifes = userLifes => {
			AdministrativeService.addLifes(userLifes)
				.then(response => {
					$scope.user = null;
					toastr.success(`Você acabou de doar ${response.data.data.Lifes} vidas!`);
				})
				.catch(error => {
					toastr.error('Houve um problema ao doar vidas para esse usuário, tente mais tarde!');
					console.log(error);
				})
		}
});