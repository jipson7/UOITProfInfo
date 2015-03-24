var API_URL = "https://calebphillips.me/ratings.php";

var IMAGE_URL = chrome.extension.getURL('lib/icon.png');

var IMAGE_URL_COLD = chrome.extension.getURL('lib/cold-icon.png');

var IMAGE_URL_WARM = chrome.extension.getURL('lib/warm-icon.png');

var IMAGE_URL_STEAMY = chrome.extension.getURL('lib/steamy-icon.png');

var IMAGE_URL_SCORCHING = chrome.extension.getURL('lib/scorching-icon.png');

var GLOBAL_RUN = false;

var BUTTONS = new Object();

function extendList() {

	for (var key in PROF_SUNSHINE) {

		if (PROF_SUNSHINE.hasOwnProperty(key)) {

			if (PROF_MASTERLIST.indexOf(key) != -1) {

				PROF_MASTERLIST.push(key);

			}

		
		}

	}	

}

extendList();

$(document).ready(function() {

	if (! GLOBAL_RUN) {

		GLOBAL_RUN = true;


		injectButtons();


	}

	
})

function injectButtons() {

	var html = document.body.innerHTML;

	var noQuote = '[^/]';

	for (var i = 0; i < PROF_MASTERLIST.length; i++) {

		var profSplit = PROF_MASTERLIST[i].split(" ");

		if (profSplit.length === 2) {

			var regex = new RegExp(noQuote + profSplit[0] + '\\s[A-Za-z]?(.\\s)?' + profSplit[1], 'gi');

		} else {

			var nameRebuild = profSplit[0];

			for (var j = 1; j < profSplit.length; j++)
				nameRebuild += "\\s" + profSplit[j]

			var regex = new RegExp(nameRebuild, 'gi');

		}

		if (regex.test(html)) {

			getProfData(i);

		}

		html = html.replace(regex, function (name) {

	        name = name.trim();
	        name = name + "<img class='tooltipIcon" + i + " globalTooltip' src='" + IMAGE_URL +  "'/>"
	        return name;
	    });

	}

	document.body.innerHTML = html;

}

function getProfData(id) {

	if (PROF_MASTERLIST[id] === "Paula Di Cato") {

		var requestUrl = API_URL + "?profname=" + encodeURIComponent("paula dicato") + "&profid=" + id;

		console.log("Damn I wish Paula was single...");
	
	} else {

		var requestUrl = API_URL + "?profname=" + encodeURIComponent(PROF_MASTERLIST[id]) + "&profid=" + id;

	}

	BUTTONS[id] = "";

	$.get(requestUrl, function(data){

		var returnID = data.substr(0,data.indexOf(' '));

		var returnData = data.substr(data.indexOf(' ')+1);

		BUTTONS[returnID] = returnData;
		
	});


	$( document ).ajaxStop(function() {
	
		createToolTips();

	});

}

function createToolTips() {

	for (var property in BUTTONS) {

		if (BUTTONS.hasOwnProperty(property)) {

			var currentTitle = BUTTONS[property];

			var checkResults = (BUTTONS[property]).split(" ");


			$(function() {
		
				if (checkResults[0] != "noResults") {

					$(".tooltipIcon" + property).attr("title", designData(currentTitle, property));

				}else {

					$(".tooltipIcon" + property).attr("title", designNoData(currentTitle, property));

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

function designNoData(data, id) {

	var addNewPersonUrl = "http://www.ratemyprofessors.com/AddTeacher.jsp";

	var dataArray = data.split(" ");

	var buildReturn = "";

	buildReturn += "This person has not been rated.<br />";

	if (dataArray[1] === "notExist") {

		buildReturn += "You can rate them <a href='" + addNewPersonUrl + "' target='_blank'>here</a><br />";

	} else if (dataArray[1] === "noData") {

		buildReturn += "You can rate them <a href='" + dataArray[2] + "' target='_blank'>here</a><br />";

	}

	buildReturn += checkSunshineData(id);

	return buildReturn;


}

function designData(data, id) {

	var dataArray = data.split(" ");

	for (var i = 0; i < dataArray.length; i++) {

		if (dataArray[i] === "null") {

			dataArray[i] = "---";

		}

	}

	var buildReturn = "Overall Rating: " + dataArray[0] + "<br />";
	
	buildReturn += "Average Grade Received: " + dataArray[1] + "<br />";

	buildReturn += "Hotness: " + dataArray[2] + " " + getHotnessImage(dataArray[2])  + "<br />";

	buildReturn += "Helpfulness: " + dataArray[3] + "<br />";

	buildReturn += "Clarity: " + dataArray[4] + "<br />";

	buildReturn += "Easiness: " + dataArray[5] + "<br />";

	buildReturn += "Based on " + dataArray[6] + " Ratings. <br />";

	buildReturn += "Add your rating <a href='" + dataArray[7] + "' target='_blank'>here</a><br />";

	buildReturn += checkSunshineData(id);

	return buildReturn;

}

function getHotnessImage(rank) {

	switch (rank) {

		case "cold":
			var hotURL = IMAGE_URL_COLD;
			break;

		case "warm":
			var hotURL = IMAGE_URL_WARM;
			break;

		case "steamy":
			var hotURL = IMAGE_URL_STEAMY;
			break;

		case "scorching":
			var hotURL = IMAGE_URL_SCORCHING;
			break;

	}

	return "<img src='" + hotURL  + "'/>";

}

function checkSunshineData(id) {

	console.log(id);

	if (PROF_MASTERLIST[id].toLowerCase() in PROF_SUNSHINE) {

		console.log("RICCHCHCH");

		return ("Salary: " + PROF_SUNSHINE[PROF_MASTERLIST[id].toLowerCase()]);

	} else {

		return "";

	}

}
