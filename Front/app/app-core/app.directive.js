angular
  .module('app')
    .directive("smaller",function(){
        return function(scope,element){
            element.css({
            'font-size': '70%',
            });
        }
    });   
angular    
  .module('app')
    .directive("line",function(){
        return function(scope,element){
            element.css({
                'text-decoration': 'line-through',
                'font-size': '115%',
                'color':'#FFFFFF',
            });
        }
    });
angular
    .module('app')
        .directive("logo", function() {
            return {
                template: `<h1 class="font-game-title font-primary"><line>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</line>IDEKY&nbsp<line>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</line></h1>`
            };
        }); 