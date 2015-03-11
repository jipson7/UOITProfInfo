
var PORTAL_TIMER;
var PORTAL_FRAME_URL;

$( document ).ready(function(){

	var currentPath = checkCurrentURL();

	if (currentPath === 0) {

		//do something for unknown URL

	} else if (currentPath === 1) {

		//do something for main urls

	} else if (currentPath == 2) {

		var frameContent = parent.frames[1];

		// console.log(frameContent.location.href)

		$(frameContent).attr("id", "content");


		$("content").ready(function() {

			startHREFUrlTimer();

			PORTAL_FRAME_URL = checkFrameURL();

		});



	}
	

		
});

function checkCurrentURL() {

	//RETURN VALUE OF 0 FOR UNKNOWN

	//RETURN VALUE OF 1 REPRESENTS THESE
	var URLS_MAIN = ["www.science.uoit.ca", "www.businessandit.uoit.ca", "education.uoit.ca", "nuclear.uoit.ca", "www.engineering.uoit.ca", "www.healthsciences.uoit.ca", "www.socialscienceandhumanities.uoit.ca", "gradstudies.uoit.ca"];

	//RETURN VALUE OF 2 REPRESENTS THESE
	var URLS_PORTAL = ["portal.mycampus.ca"];

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

	return parent.frames[1].location.href;

}

//KEEEEEEP THIS
// var frameContent = parent.frames[1];

// console.log(frameContent.location.href)

//TD TAG EXAMPLE
// var tags = $("td", parents.frames[1].document)

function portalReload() {

	console.log("Please work");

}

function injectButtons(){

	var nameTags;

	for(var i = 0; i < PROF_MASTERLIST.length; i++){

		nameTags = getAllMatchingTags(PROF_MASTERLIST[i]);

		if ((nameTags != null)&&(nameTags.length != 0)) {

			nameTags.append("<button>" + PROF_MASTERLIST[i] + "</button>");

		}

	 }

}

function getAllMatchingTags(profName) {

	//Should change the if statements to check the URL before deciding HOW to inject, that will save time

	var containerTree = $("*:contains(" + profName + ")");

	var nameTree = containerTree.filter(function(){ 
        		
        return $(this).children().length === 0;

    });

	if (nameTree.length === 0) {

		nameTree = containerTree.filter(function(){ 
        		
        	return $(this).children().children().length === 0;

    	});

    	if (nameTree.length === 0) {

    		//this works... but NOT WITH JQUERY
    		var frameTree = parent.frames[1].document;

    		$(frameTree).find("*:contains(" + profName + ")").filter(function() {

    			return $(this).children().length === 0;

    		});

    	}

	}

	return nameTree;

}

function startHREFUrlTimer() {

	PORTAL_TIMER = setTimeout(function(){ 

		HREFUrlTimer();


 	}, 100);

}

function HREFUrlTimer() {

	if (checkCurrentURL != 2) {

		return;

	} else if (checkFrameURL() != PORTAL_FRAME_URL) {

		portalReload();
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


