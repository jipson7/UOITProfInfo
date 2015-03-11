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

		if ((nameTags != null)&&(nameTags.length !== 0)) {

			nameTags.each(function() {
			
				$(this).append("<button>" + PROF_MASTERLIST[i] + "</button>");
				return false;	
			
			});	

		}

	}
		
});

function getAllMatchingTags(profName) {

	var containerTree = $(":contains('" + profName + "')");

	for (var i = 0; i < 3; i++) {

		var baseTree = getLevelOfChildren(containerTree, i);

		if (baseTree.length !== 0) {

			return baseTree;

		}

	}

	

}

function getLevelOfChildren(containerTree, level) {

	return containerTree.filter(function() {

		return $(this).children().length == level;

	});

}

function testPHP() {

	$.get("ratings.php", function(data){
			
		$("#output").text(data);
	
	});

}

jQuery.fn.justtext = function() {
   
    return $(this)  .clone()
            .children()
            .remove()
            .end()
            .text();
 
};
