var API_URL = "https://calebphillips.me/ratings.php";

var IMAGE_URL = chrome.extension.getURL('icon.png');

$(document).ready(function() {

	injectButtons();

})

function injectButtons(currentPath){

	var nameTags;

	var counter = 0;

	for(var i = 0; i < PROF_MASTERLIST.length; i++){

		nameTags = getMatchingTags(PROF_MASTERLIST[i]);

		if ((nameTags != null)&&(nameTags.length != 0)) {

			nameTags.after("<img id='tooltipIcon" + counter++ + "' title='TEST' src='" + IMAGE_URL +  "'/>");

			var requestUrl = API_URL + "?profname=" + encodeURIComponent(PROF_MASTERLIST[i]);

			$.get(requestUrl, function(data){

				console.log(data);
				
			});


		}

	 }

	setTimeout(function(){
	
		for (var i = 0; i < counter; i++) {

			$(function() {
			
				$("#tooltipIcon" + i).tooltip();
			
			});
		}
	
	}, 9000);


}

function addToolTip(elements, data) {

	$(elements).attr("class", "tooltip");
	$(elements).attr("title", data);
	
		
	


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

//makes :contains selector case insensitive
$.expr[":"].contains = $.expr.createPseudo(function(arg) {

    return function( elem ) {

        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;

    };

});

//allows jQuery selection using regex
jQuery.expr[':'].regex = function(elem, index, match) {

    var matchParams = match[3].split(','),

        validLabels = /^(data|css):/,

        attr = {

            method: matchParams[0].match(validLabels) ? 
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels,'')

        },

        regexFlags = 'ig',

        regex = new RegExp(matchParams.join('').replace(/^s+|s+$/g,''), regexFlags);

    return regex.test(jQuery(elem)[attr.method](attr.property));

}
