function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        } else {
            callback(null);
        }
    }

    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function quoteBuilder(author, quote, link) {
    var quoteHTML = "<div class='grant-iqs'><span>\"" + quote + "\"<br/><br/></span><span class='grant-iqs-author'>-" + author + "</span></div>";
    return quoteHTML;
}

var timelineElement = document.querySelector('div#timeline');
var dashboardElement = document.querySelector('div.dashboard-right');

dashboardElement.parentElement.removeChild(dashboardElement);
timelineElement.innerHTML = "";

httpGetAsync("https://quotes.rest/qod.json", function(jsonString) {

    if (jsonString == null) {
        timelineElement.innerHTML = quoteBuilder("By Me", "This is an inspirational quote", "");
        return;
    }

    var json = JSON.parse(jsonString);
    var author = json['contents']['quotes'][0]['author'];
    var quote = json['contents']['quotes'][0]['quote'];
    var link = json['contents']['quotes'][0]['permalink'];

    var inspirationalQuoteString = quoteBuilder(author, quote, link);

    timelineElement.innerHTML = inspirationalQuoteString;
});

