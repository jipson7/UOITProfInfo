var API_URL = "https://calebphillips.me/ratings.php";

var IMAGE_URL = chrome.extension.getURL('lib/icon.png');

$(document).ready(function() {

	alert(buildNameRegex("Randy Fortier"));

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
							
					},

					show: null, 

					close: function (event, ui) {

					ui.tooltip.hover(

						function () {

							$(this).stop(true).fadeTo(400, 1);

						},    

						function () {

							$(this).fadeOut("400", function () {

								$(this).remove();

							})

						});

					}

				});

			});

		}

	}

}

function designNoData(data) {

	var addNewPersonUrl = "http://www.ratemyprofessors.com/AddTeacher.jsp";

	var dataArray = data.split(" ");

	var buildReturn = "";

	if (dataArray[1] === "notExist") {

		buildReturn += "This person has not been rated yet. <br />";

		buildReturn += "You can give them one <a href='" + addNewPersonUrl + "' target='_blank'>here</a>";

	} else if (dataArray[1] === "noData") {


		buildReturn += "This person is not yet rated. <br />";

		buildReturn += "You can give them one <a href='" + dataArray[2] + "' target='_blank'>here</a>";

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

	buildReturn += "Based on " + dataArray[6] + " Ratings. <br />";

	buildReturn += "Rate them <a href='" + dataArray[7] + "' target='_blank'>here</a>";

	return buildReturn;

}


function getMatchingTags(profName) {

	var temp = document.getElementsByTagName("*");

	var regex = new RegExp(buildNameRegex(profName));

	var nameTree = [];

	for (var i = 0; i < temp.length; i++) {

		if (regex.test($(temp[i]).text())) {

			console.log("cool");

			nameTree.push(temp[i]);

		}

	}

	

	return $(nameTree);

}

function buildNameRegex(name) {

	var splitName = name.split(" ");

	returnName = "/" + splitName[0] + "([A-Z. ]+)?";

	for (var i = 1; i < splitName.length; i++) {

		if (i == splitName.length - 1) {

			returnName += splitName[i] + "/i";

		} else {

			returnName += splitName[i] + " ";

		}

	}

	return returnName;

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

var getTextNodesIn = function(el) {

    return $(el).find(":not(iframe)").addBack().contents().filter(function() {

        return this.nodeType == 3;

    });

};
