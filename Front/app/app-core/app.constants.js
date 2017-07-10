angular.module('app')
		.constant('AppConstants', {
      url: 'http://localhost:60550'
		});

angular.module("app")
		.constant('authConfig', {

        userUrl: 'http://localhost:60550/api/administrative/get',

        loginUrl: '/loginadm',

        privateUrl: '/menuadm',

        logoutUrl: '/loginadm'
    	});