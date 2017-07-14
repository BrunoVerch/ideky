angular
    .module('app.core')
    .factory('GameService', function ($rootScope, $http, $q, $localStorage, AppConstants) {
        const urlGame = `${AppConstants.url}/game`;
        const urlLevel = `${AppConstants.url}/level`;
        const urlPlayer = `${AppConstants.url}/user`;

        return {
            getFriends: getFriends,
            getLevels: getLevels,
            saveGameResult: saveGameResult,
            reduceLife: reduceLife,
        }

        function getFriends() {
            const deffered = $q.defer();
            let friends;
            $rootScope.sdkLoad
				.then(response => {
                FB.api('/me/invitable_friends?fields=name,picture.width(200)&limit=999999,friends?fields=name,picture.width(200)&limit=999999', response => {
                    deffered.resolve({ data: response.data })
                });
            });

            return deffered.promise;
        }

        function getLevels(){
            return $http({
                url: `${urlLevel}/get`,
                method: 'GET',
                authorization: `Bearer ${$localStorage.authorizationData.token}`
            });
        }

        function reduceLife(user){
            return $http({
                url: `${urlPlayer}/reduceLife`,
                method: 'PUT',
                data: user,
                headers:{ 
                    authorization: `Bearer ${$localStorage.authorizationData.token}`
                }
            });
        }

        function saveGameResult(gameResult){
             return $http({
                url: `${urlGame}/register`,
                method: 'POST',
                data: gameResult,  
                headers:{ 
                    authorization: `Bearer ${$localStorage.authorizationData.token}`
                }
            });
        }
    });