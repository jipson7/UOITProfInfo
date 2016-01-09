

function getChiliImg(image) {
   var url = chrome.extension.getURL('lib/' + image);
   return "<img src=" + url + "'/>";
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

function createRegex(name) {
    if (name.length ===2) {
        return new RegExp('[^/]' + name[0] 
                    + '((\\s[A-Za-z]?(.\\s)?)|(\\s[A-Z\\)\\(]+\\s))'
                    + name[1], 'gi');
    } else {
        return new RegExp(name.join('\\s'), 'gi');
    }
}

$(function() {
    var API_URL = "https://rmp-api-uoit.herokuapp.com/uoit/score/";
    var html = document.body.innerHTML;
    for (var i = 0; i < PROF_MASTERLIST.length; i++) {
        var name = (PROF_MASTERLIST[i]).split();
        var regex = createRegex(name);
        if (regex.test(html)){
            var url = API_URL + name.join('%20');
            $.ajax({
                url: url,
                profName: name,
                profRegex: regex,
                success: function(data) {
                    var tag = makeTag(this.profName, data);
                    html = html.replace(this.profRegex, tag);
                },
                fail: function(error) {
                    console.log(data);
                }
            });
        }
    }
    $(document).ajaxStop(function() {
        document.body.innerHTML = html;
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
    name = name.join(' ').trim();
    var body = makeToolTipData(data);
    return name + " <img class='toolTipInfo' src='" + 
           logoURL +"' title='" + body + "'/>";
}

function makeToolTipData(d) {
    return "<span>Overall Rating:</span> " + d['overall score'] + "/5<br />" +
           "<span>Average Grade:</span> " + d['average grade'] + "<br />" + 
           "<span>Hotness:</span> " + getChiliImg(d['hotness image']) + "<br />" +
           "<span>Helpfulness:</span> " + d['helpfulness'] + "/5<br />" +
           "<span>Clarity:</span> " + d['clarity'] + "/5<br />" +
           "<span>Easiness:</span> " + d['easiness'] + "/5<br />" +
           "Based on " + 'fix this' + " Ratings. <br />" +
           "Add your rating <a href='" + 'fix this' + 
           "' target='_blank'><span>here</span></a><br />" +
           'som sunchine stuff here';
}
