var API_URL = "https://calebphillips.me/ratings.php";

var IMAGE_URL = chrome.extension.getURL('lib/glass.png');

var IMAGE_URL_COLD = chrome.extension.getURL('lib/cold-icon.png');

var IMAGE_URL_WARM = chrome.extension.getURL('lib/warm-icon.png');

var IMAGE_URL_STEAMY = chrome.extension.getURL('lib/steamy-icon.png');

var IMAGE_URL_SCORCHING = chrome.extension.getURL('lib/scorching-icon.png');

var GLOBAL_RUN = false;

var BUTTONS = new Object();

/**
 * Add list items in the sunshine list to the prof masterlist
 */
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

/**
 * Execute program and check to be sure that it only runs once
 */
$(document).ready(function() {

	if (! GLOBAL_RUN) {

		GLOBAL_RUN = true;

		injectButtons();

	}

	
})

function injectButtons() {

	//create copy of the DOM
	var html = document.body.innerHTML;

	//var to check if name is part of a link or actual text
	var noQuote = '[^/]';

	//Loop through all names in the prof masterlist
	for (var i = 0; i < PROF_MASTERLIST.length; i++) {

		//split each name by first, last, and potentially middle.
		var profSplit = PROF_MASTERLIST[i].split(" ");

		//Check to see if they dont have middle name or middle intial.
		if (profSplit.length === 2) {

			//Regex, global, case insensitive
			var regex = new RegExp(noQuote + profSplit[0] + '((\\s[A-Za-z]?(.\\s)?)|(\\s[A-Z\\)\\(]+\\s))' + profSplit[1], 'gi');

		} else {

			//add first name back to nameList
			var nameRebuild = profSplit[0];

			//Add every other name back, with a space in the middle.
			for (var j = 1; j < profSplit.length; j++)
				nameRebuild += "\\s" + profSplit[j]

			var regex = new RegExp(nameRebuild, 'gi');

		}

		//Check to see if name regex exists in HTML
		if (regex.test(html)) {

			//Pull info from server if they exist
			getProfData(i);

		}

		//If name exists, replace it with a name + tooltip in the new DOM
		html = html.replace(regex, function (name) {

	        name = name.trim();
	        name = name + " <img class='tooltipIcon" + i + "' src='" + IMAGE_URL +  "'/>"
	        return name;
	    });

	}

	//replace the existing HTML with our editted one
	document.body.innerHTML = html;

}

/**
 * Get Data from Server for all existing names and create tooltips for them.
 */
function getProfData(id) {

	//Build URL to send as request to API
	var requestUrl = buildProfUrl(id);

	//Initiate place in array, this will hold the data returned for the respective professor
	BUTTONS[id] = "";

	//Perform ajax request on found prof
	$.get(requestUrl, function(data){

		//add ID of prof who sent request
		var returnID = data.substr(0,data.indexOf(' '));

		//Add all data of prof who sent request
		var returnData = data.substr(data.indexOf(' ')+1);

		//populate array with persons and their returned data
		BUTTONS[returnID] = returnData;
		
	});

	//wait until all ajax requests complete and then create the tooltips necessary to display their data
	$( document ).ajaxStop(function() {
	
		createToolTips();

	});

}

/**
 * Create URL to send to server based on the prof that we found
 */
function buildProfUrl(id) {

	//Instantiate variable that will be sent to the server, this is the RMP url that the server needs
	var requestUrl;

	/**
	 * Paula, This is because you have a weird last name. Half of the site decides it's one word, the other
	 * half decides that it is two. So I added an easter egg, because besides having a weird name you're also awesome.
	 * Cheers. Thanks for the Stats training, it actually became useful believe it or not.
	 */
	if (PROF_MASTERLIST[id] === "Paula Di Cato") {

		requestUrl = API_URL + "?profname=" + encodeURIComponent("paula dicato") + "&profid=" + id;

		console.log("Damn I wish Paula was single...");

	//You have a weird middle name thingy too but we wont make it weird.
	} else if (PROF_MASTERLIST[id] === "Sayyed Ali Hosseini") {

		requestUrl = API_URL + "?profname=" + encodeURIComponent("sayyed hosseini") + "&profid=" + id;
	
	} else {

		//Everybody else
		requestUrl = API_URL + "?profname=" + encodeURIComponent(PROF_MASTERLIST[id]) + "&profid=" + id;

	}

	return requestUrl;


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

					},

					tooltipClass: "customTooltip"

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

	var buildReturn = "<span>Overall Rating:</span> " + dataArray[0] + "/5<br />";
	
	buildReturn += "<span>Average Grade:</span> " + dataArray[1] + "<br />";

	buildReturn += "<span>Hotness:</span> " + dataArray[2] + " " + getHotnessImage(dataArray[2])  + "<br />";

	buildReturn += "<span>Helpfulness:</span> " + dataArray[3] + "/5<br />";

	buildReturn += "<span>Clarity:</span> " + dataArray[4] + "/5<br />";

	buildReturn += "<span>Easiness:</span> " + dataArray[5] + "/5<br />";

	buildReturn += "Based on " + dataArray[6] + " Ratings. <br />";

	buildReturn += "Add your rating <a href='" + dataArray[7] + "' target='_blank'><span>here</span></a><br />";
	
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

	if (PROF_MASTERLIST[id].toLowerCase() in PROF_SUNSHINE) {

		var profSalary = PROF_SUNSHINE[PROF_MASTERLIST[id].toLowerCase()];

		return ("<span>Salary:</span> " + convertToCurrency(profSalary) + "<br />");

	} else {

		return "";

	}

}

function convertToCurrency(salaryString) {

	var moneyString = parseFloat(salaryString).toFixed(2).toString();

	return "$" + moneyString.substring(0,3) + "," + moneyString.substring(3);
	
}
