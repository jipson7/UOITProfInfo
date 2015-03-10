//This function is suppose to make jQuery contains selector case incensitive
//// found here https://css-tricks.com/snippets/jquery/make-jquery-contains-case-insensitive/
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});


$( document ).ready(function(){

	var childList = $(":not(:has(*))");
	
	var nameTags;

	for(var i = 0; i < PROF_MASTERLIST.length; i++){

		nameTags = childList.filter(":contains('" + PROF_MASTERLIST[i] + "')");

		if (nameTags.length !== 0) {

			nameTags.each(function() {
			
				$(this).append("<button>TEST</button>");	
			
			});	

		}

	}
		
});

function testPHP() {

	$.get("ratings.php", function(data){
			
		$("#output").text(data);
	
	});

}
