angular
    .module('app.core')
    .factory('RankingService', function($http, $localStorage, AppConstants) {
        const url = `${AppConstants.url}/game`;

        return {
            getDailyRank: getDailyRank,
            getMothlyRank: getMothlyRank,
            getOverallRank: getOverallRank,
            getFriendsRanking: getFriendsRanking,
        }

        function getDailyRank() {
            return $http({
                url: `${url}/dailyRanking`,
                headers:{
                    Authorization: `Bearer ${$localStorage.authorizationData.token}`
                }
            });
        }

        function getMothlyRank() {
            return $http({
                url: `${url}/monthlyRanking`,
                headers:{
                    Authorization: `Bearer ${$localStorage.authorizationData.token}`
                }
            });
        }

        function getOverallRank() {
            return $http({
                url: `${url}/overallranking`,
                headers:{
                    Authorization: `Bearer ${$localStorage.authorizationData.token}`
                }
            });
        }

        function getFriendsRanking(friendsList){
            return $http({
                url: `${url}/friendsranking`,
                method: 'PUT',
                data: friendsList,
                headers:{
                    Authorization: `Bearer ${$localStorage.authorizationData.token}`
                }
            });
        }
    });