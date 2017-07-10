angular
	.module('app.core')
	.controller('LoginController', function ($scope, LoginService) {
		
		$scope.login = () => {
			LoginService.login()
				.then(response => console.log(response)) // TODO redirecionar apos login
				.catch(error => console.log(error));
		}
});