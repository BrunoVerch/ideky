angular
    .module('app.core')
    .config(function($routeProvider) {
        $routeProvider
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'app/app-modules/login/login.html'
            })
            .otherwise({
                redirectTo: '/login'
            });
    });