angular 
.module('app.core')
.factory('httpInterceptor', function ($q, $rootScope, $log) {
    let numLoadings = 0;

    function verificaLoader() {
        if (!(--numLoadings)) 
            $rootScope.$broadcast("loader_hide");
    }

    return {
        // Intercepta a requisição
        request: function (config) {
            numLoadings++;

            // Show loader
            $rootScope.$broadcast("loader_show");
            return config || $q.when(config)

        },
        // Intercepta a resposta
        response: function (response) {
            verificaLoader();

            return response || $q.when(response);

        },
        // Intercepta a resposta em caso de erro
        responseError: function (response) {
            verificaLoader();

            return $q.reject(response);
        }
    };
})