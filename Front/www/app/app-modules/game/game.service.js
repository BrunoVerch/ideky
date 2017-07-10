angular
    .module('app.core')
    .factory('GameService', function ($rootScope, $http, $q, AppConstants) {
        const url = `${AppConstants.url}/api/game/`;

        return {
            getFriends: getFriends
        }

        function getFriends() {
            const deffered = $q.defer();
            let friends;

            $rootScope.sdkLoad
				.then(response => {
                FB.api(`/me/friends?limit=99999`, response => {
                    friends = response.data;

                    FB.api(`/me/invitable_friends?limit=99999`, resp => 
                        deffered.resolve({ data: friends.concat(resp.data) })
                    );
                });
            });

            return deffered.promise;
        }
    });