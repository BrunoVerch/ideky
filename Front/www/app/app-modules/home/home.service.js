angular
    .module('app.core')
    .factory('HomeService', function($rootScope,$http, $q, AppConstants) {
        const url = `${AppConstants.url}/api/user`;

        return {
            getUser: getUser,
        }

        function getUser() {
            const deffered = $q.defer();
            let user;

            $rootScope.sdkLoad
				.then(() => {
                FB.api('/me/', response => {
                    user = response;
                    
                    $http.get(`${url}/getByFacebookId/${user.id}`)
                        .then(resp => {
                            user.record = resp.data.data.Record;
                            user.lifes = resp.data.data.Lifes;
                        });
                });

                FB.api('/me/picture', resp => {
                    user.picture = resp.data.url;
                    deffered.resolve({ data: user });
                }); 
            });


            return deffered.promise;
        }
    });