angular
    .module('app.core')
    .factory('RankingService', function($http, AppConstants) {
        const url = `${AppConstants.url}/api/game`;

        return {
            getDailyRank: getDailyRank,
            getMothlyRank: getMothlyRank,
            getOverallRank: getOverallRank
        }

        function getDailyRank() {
            return $http.get(`${url}/dailyRanking`);
        }

        function getMothlyRank() {
            return $http.get(`${url}/monthlyRanking`);
        }

        function getOverallRank() {
            return $http.get(`${url}/overallranking`);
        }
    });