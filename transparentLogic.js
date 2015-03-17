var API_URL = "https://calebphillips.me/ratings.php";

var IMAGE_URL = chrome.extension.getURL('icon.png');

$(document).ready(function() {

	injectButtons();

})

function injectButtons(currentPath){

	var nameTags;

	for(var i = 0; i < PROF_MASTERLIST.length; i++){

		nameTags = getMatchingTags(PROF_MASTERLIST[i]);


		if ((nameTags != null)&&(nameTags.length != 0)) {

			//nameTags.append("<button>" + PROF_MASTERLIST[i] + "</button>");

			var requestUrl = API_URL + "?profname=" + encodeURIComponent(PROF_MASTERLIST[i]);

			$.get(requestUrl, function(data){

				alert(data);


			});

			nameTags.append("<img src='" + IMAGE_URL +  "'/>");

		}

	 }

}

function getMatchingTags(profName) {

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

$.expr[":"].contains = $.expr.createPseudo(function(arg) {

    return function( elem ) {

        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;

    };

});
