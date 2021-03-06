angular
	.module('app.core')
	.controller('LoginController', function ($scope, $localStorage, $location, LoginService, AppConstants, $rootScope) {
		
		let oauthWindow;

		$scope.login = () => {
      
			let redirectUri = `${location.protocol}//${location.host}/authcomplete.html`;
			let externalProviderUrl = `${AppConstants.url}/auth/ExternalLogin?provider=Facebook&response_type=token&client_id=1392336224214575&redirect_uri=${redirectUri}&scope=user_friends`;

			window.$windowScope = $scope;

			oauthWindow = window.open(externalProviderUrl, 'Authenticate Account', 'location=0,status=0,width=600,height=750');
		}

		$scope.authCompletedCB = fragment => {
			let externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
			
			LoginService.obtainAccessToken(externalData)
				.then(response => {
					$localStorage.authorizationData = { 
							token: response.data.access_token,
							userName: response.data.userName
							};
					
					oauthWindow.close();

					$location.path('/home');
				}).error();
		}
});