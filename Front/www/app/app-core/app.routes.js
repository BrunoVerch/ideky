angular
    .module('app')
    .config(function($routeProvider) {
        $routeProvider
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'app/app-modules/login/login.html'
            })
            .when('/home', {
                controller: 'HomeController',
                templateUrl: 'app/app-modules/home/home.html'
            })
            .when('/game', {
                controller: 'GameController',
                templateUrl: 'app/app-modules/game/game.html'
            })


            .otherwise({
                redirectTo: '/login'
            });
    });