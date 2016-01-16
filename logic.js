
var API_URL = "https://rmp-api-uoit-dev.herokuapp.com/uoit/";
var logoURL = chrome.extension.getURL('lib/glass.png');    
var prof_list = null;

(function getProfs() {
    var url = API_URL + 'profs' ;
    $.get(url, function(data) {
        prof_list = data.profs; 
        $(function() { init(); });
    }).fail(function() {
        getProfs();
    });
})();

function init() {
    for (var i = 0; i < prof_list.length; i++) {
        var prof = prof_list[i]
        var elements = $(":contains('" + prof + "'):last");
        if (elements.length){
            var url = API_URL + 'score/' + encodeURIComponent(prof);
            $.ajax({
                url: url,
                prof: prof,
                elements: elements,
                success: function(data) {
                    var tag = makeTag(this.prof, data);
                    this.elements.append(tag);
                },
                error: function(error) {
                    var data = JSON.parse(error.responseText);
                    var tag = makeErrorTag(this.prof, data);
                    this.elements.append(tag);
                },
                complete: function() {
                    initTips(this.elements);
                }
            });
        }
    }
}

function initTips(elements) {
    elements.tooltip({
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

function makeErrorTag(name, data) {
    var body = data.message + "<br /> Add your rating " +
               escapeHtml("<a href='" + data.url + 
                          "' target='_blank'" + 
                          "><span>here</span></a>") +
               "<br /> <span>Salary:</span> " + data.salary;
    return " <img src='" + logoURL +"' title='" + body + "'/>";
}

function makeTag(name, data) {
    var body = makeToolTipData(data);
    return " <img src='" + logoURL +"' title='" + body + "'/>";
}

function makeToolTipData(d) {
    return "<span>Overall Rating:</span> " + d['overall_score'] + "/5<br />" +
           "<span>Average Grade:</span> " + d['average_grade'] + "<br />" + 
           "<span>Hotness:</span> " + getChiliImg(d['hotness_image']) + "<br />" +
           "<span>Helpfulness:</span> " + d['helpfulness'] + "/5<br />" +
           "<span>Clarity:</span> " + d['clarity'] + "/5<br />" +
           "<span>Easiness:</span> " + d['easiness'] + "/5<br />" +
           "Based on <span>" + d['num_ratings'] + "</span>. <br />" +
           "Add your rating " +
           escapeHtml("<a href='" + d['profile_url'] +
                      "' target='_blank'><span>here</span></a><br />") +
           "<span>Salary:</span> " + d['salary'];
}

function getChiliImg(image) {
   var url = chrome.extension.getURL('lib/' + image);
   return escapeHtml("<img src='" + url + "'/>");
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }
