//This function is suppose to make jQuery's :contain selector case incensitive
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

		if ((nameTags != null)&&(nameTags.length != 0)) {

			nameTags.append("<button>" + PROF_MASTERLIST[i] + "</button>");

		}

	}
		
});

function getAllMatchingTags(profName) {

	//Should change the if statements to check the URL before deciding HOW to inject, that will save time

	var containerTree = $("*:contains(" + profName + ")");

	var nameTree = containerTree.filter(function(){ 
        		
        return $(this).children().length === 0;

    });

	if (nameTree.length === 0) {

		nameTree = containerTree.filter(function(){ 
        		
        	return $(this).children().children().length === 0;

    	});

    	if (nameTree.length === 0) {

    		nameTree = $("*:contains(" + profName + ")",top.frames["content"].document).filter(function() {

    			return $(this).children().length === 0;

    		});

    	}

	}

	return nameTree;

}


function testPHP() {

	$.get("ratings.php", function(data){
			
		$("#output").text(data);
	
	});

}

