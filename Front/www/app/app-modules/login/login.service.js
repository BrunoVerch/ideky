angular
    .module('app.core')
    .factory('LoginService', function($http) {

        var urlNome = 'http://localhost:9090/api/nome';

        function carregarNome() {
            return $http.post(`$(urlNome)/nome`);
        };

        return {
            carregar: carregarNome
        };
    });