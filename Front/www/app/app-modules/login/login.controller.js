angular
	.module('app.core')
	.controller('LoginController', function ($scope, LoginService) {
		
		$scope.login = () => {
			LoginService.login()
				.then(responde => console.log(response))
				.catch(error => console.log(error));
		}
});