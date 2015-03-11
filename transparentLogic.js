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


		$("*:contains(" + PROF_MASTERLIST[i] + ")").filter(function() {

			var reg = new RegExp(PROF_MASTERLIST[i], 'i');

			return reg.test($(this).text());

		}).each(function() {

			$(this).append("<button>" + PROF_MASTERLIST[i] + "</button>")
		})

	}
		
});

function getAllMatchingTags(profName) {



	var containerTree = $("*:contains(" + profName + ")").filter(function(){ 
        		
        return $(this).children().length === 0;

    });

    if (containerTree.length === 0) {

    	var containerTree = $("*:contains(" + profName + ")").filter(function(){ 
        		
        	return $(this).children().length === 1;

    	});

    } 

    return containerTree;




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
