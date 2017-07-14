angular
	.module('app.core')
	.controller('LoginadmController', function ($scope, AdministrativeService, toastr, authService) {
		
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
});