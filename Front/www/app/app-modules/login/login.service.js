angular
    .module('app.core')
    .factory('LoginService', function($http, AppConstants) {
        const url = `${AppConstants.url}/auth`;

        return {
            login: login
        }

        function login() {
            // return $http({
            //     method: 'GET',
            //     url: `${url}/ExternalLogin?provider=Facebook&response_type=token&client_id=1392336224214575&redirect_uri=http://localhost:60550/`,
            //     headers: {
            //         'Access-Control-Allow-Origin': true,
            //         'X-Requested-With': 'XMLHttpRequest'
            //     }        
            // });

            var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';

            var externalProviderUrl = url + "/ExternalLogin?provider=Facebook&response_type=token&client_id=1392336224214575&redirect_uri=http://localhost:4445/authComplete.html";
            //window.$windowScope = $scope;

            var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
        }
    });