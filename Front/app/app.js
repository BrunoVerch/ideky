angular.module('app')
	// O run é a primeira coisa que roda na aplicação, é executado antes de qualquer coisa.
	// é injetado '$log' antes da função para que ao mimificar a função não perca a referência de estar relacionada ao que foi declarado. 
	.run([
		'$log',
		function($log) {
			$log.debug('App Running')
		}
	])
	// debugEnabled faz com que não seja necessário retirar os $log.debug dos .js quando o projeto é publicado, apenas alterando para "false" ele já retira todos os logs.
	.config([
		'$logProvider',
		function($logProvider) {
			$logProvider.debugEnabled(true);
		}		
	])	