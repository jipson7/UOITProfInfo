
$( document ).ready(function(){

	//THIS IS A NAME CHANGING TEST
	//it searches for any element without children, sees if it contains a string, and changes it
	//
	

	//Find everything without children
	var childList = $(":not(:has(*))");
	
	//find everything that contains 'find me'
	var nameTags = childList.filter(":contains('find me')");

	//append a button to each of them
	nameTags.each(function() {
	
		$(this).append("<button>TEST</button>");
	
	});

	
});

function testPHP() {

	$.get("ratings.php", function(data){
			
		$("#output").text(data);
	
	});

}
