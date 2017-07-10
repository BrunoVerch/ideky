angular
    .module('app.core')
    .factory('GameService', function ($http, $q, AppConstants) {
        const url = `${AppConstants.url}/api/user/`;

        return {
            getFriends: getFriends,
            getUser: getUser
        }

        function getFriends() {
            const deffered = $q.defer();
            let friends;

            FB.api(`/me/friends?limit=99999`, response => {
                friends = response.data;

                FB.api(`/me/invitable_friends?limit=99999`, resp => 
                    deffered.resolve({ data: friends.concat(resp.data) })
                );
            });

            return deffered.promise;
        }

        function getUser() {
            const deffered = $q.defer();
            let user;

            FB.api('/me/', response => {
                user = response;
                
                $http.get(`${url}/getByFacebookId/${user.id}`)
                    .then(r => {
                        user.record = r.data.data.Record;
                        user.lifes = r.data.data.Lifes;

                        FB.api('/me/picture', resp => {
                            user.picture = resp.data.url;
                            deffered.resolve({ data: user });
                        }); 
                    });
            });

            return deffered.promise;
        }
    });