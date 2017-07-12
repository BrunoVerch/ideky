angular
    .module('app.core')
    .factory('HomeService', function($rootScope,$http, $q, AppConstants) {
        const url = `${AppConstants.url}/user`;

        return {
            getUser: getUser,
        }

        function getUser() {
            const deffered = $q.defer();
            let user;

            $rootScope.sdkLoad
				.then(() => {
                FB.api('/me?fields=id,name,picture', response => {
                    user = response;
                    console.log(user);
                    $http.get(`${url}/getByFacebookId/${user.id}`)
                        .then(resp => {
                            user.record = resp.data.data.Record;
                            user.lifes = resp.data.data.Lifes;
                            deffered.resolve({ data: user });
                        });
                });
            });


            return deffered.promise;
        }
    });