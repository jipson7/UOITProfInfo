var PORTAL_TIMER;
var PORTAL_FRAME_URL;

$( document ).ready(function(){

	var currentPath = checkCurrentURL();

	if (currentPath === 0) {

		//do something for unknown URL

	} else if (currentPath === 1) {

		injectButtons(1);

	} else if (currentPath == 2) {

		setTimeout(function() {

			startHREFUrlTimer();

			PORTAL_FRAME_URL = checkFrameURL();

		}, 100);

	}
	

		
});

function checkCurrentURL() {

	//RETURN VALUE OF 0 FOR UNKNOWN

	//RETURN VALUE OF 1 REPRESENTS THESE
	var URLS_MAIN = ["www.science.uoit.ca", "www.businessandit.uoit.ca", "education.uoit.ca", "nuclear.uoit.ca", "www.engineering.uoit.ca", "www.healthsciences.uoit.ca", "www.socialscienceandhumanities.uoit.ca", "gradstudies.uoit.ca"];

	//RETURN VALUE OF 2 REPRESENTS THESE
	var URLS_PORTAL = ["portal.mycampus.ca/cp"];

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

}

function checkFrameURL() {

	return parent.frames[1].document.URL;

}

//KEEEEEEP THIS
// var frameContent = parent.frames[1];

// console.log(frameContent.location.href)

//TD TAG EXAMPLE
// var tags = $("td", parents.frames[1].document)

function getMatchingTagsPORTAL(profName) {

	console.log("Thank you");

	var nameTree;

	var frameRoot = parent.frames[1].document;

	var frameTree = $("*:contains(" + profName + ")", frameRoot);

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

	if (checkCurrentURL() != 2) {

		return;

	} else if (checkFrameURL() != PORTAL_FRAME_URL) {

		injectButtons(2);
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


