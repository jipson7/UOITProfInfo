//This function is suppose to make jQuery contains selector case incensitive
//// found here https://css-tricks.com/snippets/jquery/make-jquery-contains-case-insensitive/
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});


$( document ).ready(function(){
	
	var nameTags;

	for(var i = 0; i < PROF_MASTERLIST.length; i++){

		nameTags = getAllMatchingTags(PROF_MASTERLIST[i]);

		nameTags.append("<button>" + PROF_MASTERLIST[i] + "</button>");

	}
		
});

function getAllMatchingTags(profName) {

	var containerTree = $("*:contains(" + profName + ")");

	var nameTree = containerTree.filter(function(){ 
        		
        return $(this).children().length === 0;

    });

	if (nameTree.length === 0) {

		nameTree = containerTree.filter(function(){ 
        		
        	return $(this).children().children().length === 0;

    	});

	}

	return nameTree;

}


function testPHP() {

	$.get("ratings.php", function(data){
			
		$("#output").text(data);
	
	});

}

