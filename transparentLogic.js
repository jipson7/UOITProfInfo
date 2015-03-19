var API_URL = "https://calebphillips.me/ratings.php";

var IMAGE_URL = chrome.extension.getURL('lib/icon.png');

$(document).ready(function() {

	injectButtons();

})

function injectButtons(currentPath){

	var nameTags;

	var buttons = new Object();

	for(var i = 0; i < PROF_MASTERLIST.length; i++){

		var currentProfName = PROF_MASTERLIST[i];

		nameTags = getMatchingTags(currentProfName);

		if ((nameTags != null)&&(nameTags.length != 0)) {

			nameTags.append("<img class='tooltipIcon" + i + " globalTooltip' src='" + IMAGE_URL +  "'/>");

			buttons[i] = "";

			if ((currentProfName.split(" ")).length > 2) {

				currentProfName = sandwichPaula(currentProfName);

			}

			var requestUrl = API_URL + "?profname=" + encodeURIComponent(currentProfName) + "&profid=" + i;

			$.get(requestUrl, function(data){

				var returnID = data.substr(0,data.indexOf(' '));

				var returnData = data.substr(data.indexOf(' ')+1);

				buttons[returnID] = returnData;
				
			});


		}

	 }

	$( document ).ajaxStop(function() {
	
		createToolTips(buttons);
	
	});

}

function createToolTips(buttons) {

	for (var property in buttons) {

		if (buttons.hasOwnProperty(property)) {

			var currentTitle = buttons[property];

			var checkResults = (buttons[property]).split(" ");


			$(function() {
		
				if (checkResults[0] != "noResults") {

					$(".tooltipIcon" + property).attr("title", designData(currentTitle));

				}else {

					$(".tooltipIcon" + property).attr("title", designNoData(currentTitle));

				}
				$(".tooltipIcon" + property).tooltip({
				
				
					content:function() {
							
						return this.getAttribute("title");
							
					}	
				
				});
					
		
			});

		}
	}


}

function designNoData(data) {

	var addNewPersonUrl = "http://www.ratemyprofessors.com/AddTeacher.jsp";

	var dataArray = data.split(" ");

	var buildReturn;

	if (dataArray[1] === "notExist") {

		buildReturn += "This person does not have a page yet. <br />";

		buildReturn += "You can give them one <a href='" + addNewPersonUrl + "'>here</a>;

	} else if (dataArray[1] === "noData") {


		buildReturn += "This person does not have any ratings yet. <br />";

		buildReturn += "You can give them one <a href='" + dataArray[2] + "'>here</a>";

	}

	return buildReturn;


}

function designData(data) {

	var dataArray = data.split(" ");

	for (var i = 0; i < dataArray.length; i++) {

		if (dataArray[i] === "null") {

			dataArray[i] = "---";

		}

	}

	var buildReturn = "Overall Rating: " + dataArray[0] + "<br />";
	
	buildReturn += "Average Grade Received: " + dataArray[1] + "<br />";

	buildReturn += "Hotness: " + dataArray[2] + "<br />";

	buildReturn += "Helpfulness: " + dataArray[3] + "<br />";

	buildReturn += "Clarity: " + dataArray[4] + "<br />";

	buildReturn += "Easiness: " + dataArray[5] + "<br />";

	buildReturn += "Based on " + dataArray[6] + " Ratings.";

	return buildReturn;

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

function sandwichPaula(currentName) {

	var splitName = currentName.split(" ");

	var rebuiltName = splitName[0];

	for (var i = 1; i < splitName.length; i++) {

		rebuiltName += splitName[i];

	}

	return rebuiltName;

}
