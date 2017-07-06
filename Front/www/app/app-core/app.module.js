angular
    .module('app.core', [
        
    ]);

angular
    .module('app', [
        'ngRoute',
        'auth',
        'ui.bootstrap',
        'ngAnimate',
        'toastr',
        'ngStorage',
        'luegg.directives',
        'app.core'
    ]);