angular.module('app.core')
		.constant('AppConstants', {
            url: 'http://ideky.azurewebsites.net/api'
            //url: 'http://localhost:60550'
      })
      .constant('authConfig', {
            userAdmUrl: 'http://ideky.azurewebsites.net/api/administrative/get',
            loginAdmUrl: '/loginadm',
            menuAdmUrl: '/menuadm',
            privateAdmUrl: '/menuadm',
            logoutAdmUrl: '/loginadm',
            loginFacebookUrl: 'login',
            privateFacebookUrl: '/home',        
            logoutFacebookUrl: '/login',
            profileFacebookUrl: '/profile',
    	});