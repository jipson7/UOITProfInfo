var PORTAL_TIMER;
var PORTAL_FRAME_URL;

$( document ).ready(function(){

	var currentPath = checkCurrentURL();

	if (currentPath === 0) {

		//do something for unknown URL

	} else if (currentPath === 1) {

		alert("We're on a main page");

		injectButtons(1);

	} else if (currentPath === 2) {

		alert("We're on a frame page");

		setTimeout(function() {

			startHREFUrlTimer();

			PORTAL_FRAME_URL = checkFrameURL();

		}, 100);

	} else if (currentPath ===3) {

		alert("its loading the frame, its a miracle");

	}
	

		
});

function checkCurrentURL() {

	//RETURN VALUE OF 0 FOR UNKNOWN

	//RETURN VALUE OF 1 REPRESENTS THESE
	var URLS_MAIN = ["www.science.uoit.ca", "www.businessandit.uoit.ca", "education.uoit.ca", "nuclear.uoit.ca", "www.engineering.uoit.ca", "www.healthsciences.uoit.ca", "www.socialscienceandhumanities.uoit.ca", "gradstudies.uoit.ca"];

	//RETURN VALUE OF 2 REPRESENTS THESE
	var URLS_PORTAL = ["portal.mycampus.ca/cp"];

	var URLS_FRAME = ["https://ssbp.mycampus.ca/prod/bwskfshd.P_CrseSchdDetl"]

	var currentURL = document.URL;

	for (var i = 0; i < URLS_MAIN.length; i++) {

		if (currentURL.indexOf(URLS_MAIN[i]) > -1){

			return 1;

		}

	}

	for (var i = 0; i < URLS_PORTAL.length; i++) {

		if (currentURL.indexOf(URLS_PORTAL[i]) > -1){

			return 2;

		}

	}

	for (var i = 0; i < URLS_FRAME.length; i++) {

		if (currentURL.indexOf(URLS_FRAME[i]) > -1){

			return 3;

		}

	}

	return 0;

}

function checkFrameURL() {

	return parent.frames[1].document.URL;

}

function checkParsableFrameUrl() {

	var parsableURLS = ["ssbp.mycampus.ca/prod/bwskfshd.P_CrseSchdDetl"];

	for (var i = 0; i < parsableURLS.length; i++) {

		if (checkFrameURL().indexOf(parsableURLS[i]) > -1) {

			return true;

		}
	}

	return false;

}

function getMatchingTagsPORTAL(profName) {

	var nameTree;

	var frameRoot = parent.frames[1].document.body;
	console.log("finding frame document");
	console.log(frameRoot);

	var frameTree = $("*:contains(" + profName + ")", frameRoot);
	console.log("finding frame elements");

	nameTree = $(frameTree).filter(function() {

		return $(this).children().length === 0;

	});

	return nameTree;

}

function getMatchingTagsMAIN(profName) {

	//Should change the if statements to check the URL before deciding HOW to inject, that will save time

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

function injectButtons(currentPath){

	var nameTags;

	for(var i = 0; i < PROF_MASTERLIST.length; i++){

		if (currentPath == 1) {

			nameTags = getMatchingTagsMAIN(PROF_MASTERLIST[i]);

		} else if (currentPath == 2) {

			nameTags = getMatchingTagsPORTAL(PROF_MASTERLIST[i]);

		}	

		if ((nameTags != null)&&(nameTags.length != 0)) {

			nameTags.append("<button>" + PROF_MASTERLIST[i] + "</button>");

		}

	 }

}


function startHREFUrlTimer() {

	PORTAL_TIMER = setTimeout(function(){ 

		HREFUrlTimer();


 	}, 100);

}

function HREFUrlTimer() {

	//Check to see if we've left portal.mycampus
	if (checkCurrentURL() != 2) {

		return;

	//Check to see if we've changed frames
	} else if (checkFrameURL() != PORTAL_FRAME_URL) {

		//check to see if we're actually at a frame that requires parsing within the portal
		if(checkParsableFrameUrl()){

			//testScrape();

			injectButtons(2);

		}
		PORTAL_FRAME_URL = checkFrameURL();

	}

	PORTAL_TIMER = setTimeout(function() {

		HREFUrlTimer();

	}, 100);

}

function testPHP() {

	$.get("ratings.php", function(data){
			
		$("#output").text(data);
	
	});

}


//This function is suppose to make jQuery's :contain selector case incensitive
//// found here https://css-tricks.com/snippets/jquery/make-jquery-contains-case-insensitive/
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

function testScrape() {

	var frameRoot = parent.frames[1].document;

	var xpathResult = frameRoot.evaluate('//*[text()="' + "Class" + '"]', frameRoot, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);

	console.log(xpathResult);


}

