angular
    .module('app.core')
    .config(function($routeProvider) {
        $routeProvider
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'app/app-modules/login/login.html'
            })
            .when('/home', {
                controller: 'SrtartController',
                templateUrl: 'app/app-modules/home/home.html'
            })


            .otherwise({
                redirectTo: '/login'
            });
    });