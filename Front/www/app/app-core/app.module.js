angular
    .module('app.core', [
        'ngRoute',
        'ui.bootstrap',
        'ngAnimate',
        'toastr',
        'ngStorage',
        'luegg.directives',
    ]);

angular
    .module('app', [        
        'app.core'
    ]);