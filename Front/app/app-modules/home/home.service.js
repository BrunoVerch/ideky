angular
    .module('app.core')
    .factory('HomeService', function($rootScope,$http, $q, $localStorage, AppConstants) {
        const url = `${AppConstants.url}/user`;

        return {
            getUser: _getUser,
            updatePicture: _updatePicture
        }

        function _getUser() {
            const deffered = $q.defer();
            let user;

            $rootScope.sdkLoad
				.then(() => {
                FB.api('/me?fields=id,name,picture', response => {
                    user = {};
                    user.FacebookId = response.id;
                    user.Name = response.name;
                    user.Picture = response.picture.data.url;
                    $http({
                        url: `${url}/getByFacebookId/${user.FacebookId}`,
                        method: 'GET',
                        headers:{
                            Authorization: `Bearer ${$localStorage.authorizationData.token}`
                        }
                    })
                        .then(resp => {
                            user.Record = resp.data.data.Record;
                            user.Lifes = resp.data.data.Lifes;
                            deffered.resolve({ data: user });
                            $localStorage.User = user;
                        })
                        .catch(error => console.log(error));
                });
            });
            return deffered.promise;
        }

        function _updatePicture(user){
            return $http({
            url: `${url}/updatePicture`,
            method: 'PUT',
            data: user,
            headers:{
                Authorization: `Bearer ${$localStorage.authorizationData.token}`
            }
          });
        }
    });