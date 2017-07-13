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
            .when('/ranking', {
                controller: 'RankingController',
                templateUrl: 'app/app-modules/ranking/ranking.html'
            })
            .when('/loginadm', {
                controller: 'LoginadmController',
                templateUrl: 'app/app-modules/administrative/loginadm/loginadm.html'
            })
            .when('/menuadm', {
                controller: 'MenuadmController',
                templateUrl: 'app/app-modules/administrative/menuadm/menuadm.html',
                resolve: {                
                        autenticado: function (authService) {
                        return authService.isAutenticadoPromise();
                    }
                }
            })
            .when('/lifesadm', {
                controller: 'LifesadmController',
                templateUrl: 'app/app-modules/administrative/lifesadm/lifesadm.html',
                resolve: {                
                        autenticado: function (authService) {
                        return authService.isAutenticadoPromise();
                    }
                }
            })
            .when('/levelsadm', {
                controller: 'LevelsadmController',
                templateUrl: 'app/app-modules/administrative/levelsadm/levelsadm.html',
                resolve: {                
                        autenticado: function (authService) {
                        return authService.isAutenticadoPromise();
                    }
                }
            })
            // .when('/authComplete', {
            //     templateUrl: 'authComplete.html'
            // })
            .otherwise({
                redirectTo: '/login'
            });
    });