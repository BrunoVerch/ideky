angular
	.module('app.core')
	.controller('LoginadmController', function ($scope, AdministrativeService, toastr, authService) {
		
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

		let loginValidate = (user) => {
			if(typeof user === 'undefined' || user === null){
				return false;
			}else if(user.email.replace(/^\s+|\s+$/g,"") === '' || user.password.replace(/^\s+|\s+$/g,"") === ''){
				return false;
			}
			return true;
		}
		
		$scope.login = (user) => {
			if(loginValidate(user)){
				authService.login(user)
				.then(
					function (response) {
						toastr.success('Logado com sucesso!');
						$scope.user = {};
					},
					function (response) {
						toastr.error('Erro no Login. Verifique seu usuário e senha');
				});
			}else{
				toastr.error('Usuário ou senha inválidos.');
			}
    	}

		// $scope.logout = () => {
		// 	authService.logout()
		// 	.then(
		// 		function (response) {
		// 			toastr.success('Deslogado com sucesso!');
		// 		});
		// }
});