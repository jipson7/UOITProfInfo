

function getChiliImg(image) {
   var url = chrome.extension.getURL('lib/' + image);
   return "<img src='" + url + "'/>";
}

(function() {
    for (var key in PROF_SUNSHINE) {
        if (PROF_SUNSHINE.hasOwnProperty(key)) {
            if (PROF_MASTERLIST.indexOf(key) != -1) {
                PROF_MASTERLIST.push(key);
            }
        }
    }   
})();

$(function() {
    var API_URL = "https://rmp-api-uoit.herokuapp.com/uoit/score/";
    for (var i = 0; i < PROF_MASTERLIST.length; i++) {
        var prof = PROF_MASTERLIST[i]
        var elements = $(":contains('" + prof + "'):last");
        if (elements.length){
            var url = API_URL + encodeURIComponent(prof);
            $.ajax({
                url: url,
                prof: prof,
                elements: elements,
                success: function(data) {
                    var tag = makeTag(this.prof, data);
                    this.elements.append(tag);
                },
                fail: function(error) {
                    console.log(error);
                }
            });
        }
    }

    $(document).ajaxStop(function() {
        initTips();
    });
});

function initTips() {
    $('.toolTipInfo').tooltip({
        content: function() {
            return this.getAttribute('title');
        },
        show: null,
        close: function(event, ui) {
            ui.tooltip.hover(function () {
                $(this).stop(true).fadeTo(400, 1);
            },    
            function () {
                $(this).fadeOut("400", function () {
                    $(this).remove();
                })
            }); 
        }
    });
}

function makeTag(name, data) {
    var logoURL = chrome.extension.getURL('lib/glass.png');    
    var body = makeToolTipData(data);
    return " <img class='toolTipInfo' src='" + 
           logoURL +"' title='" + body + "'/>";
}

function makeToolTipData(d) {
    return ("<span>Overall Rating:</span> " + d['overall score'] + "/5<br />" +
           "<span>Average Grade:</span> " + d['average grade'] + "<br />" + 
           //"<span>Hotness:</span> " + getChiliImg(d['hotness image']) + "<br />" +
           "<span>Helpfulness:</span> " + d['helpfulness'] + "/5<br />" +
           "<span>Clarity:</span> " + d['clarity'] + "/5<br />" +
           "<span>Easiness:</span> " + d['easiness'] + "/5<br />");
           //"Based on " + 'fix this' + " Ratings. <br />" +
           //"Add your rating <a href='" + 'www.google.ca' +
           //"' target='_blank'><span>here</span></a><br />" +
           //'som sunchine stuff here').replace(/"/g, "'");
}
