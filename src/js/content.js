var globalQuoteHTML = "";

function makeHTTPRequest(theUrl)
{
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.onload = resolve;
        request.onerror = reject;
        request.open("GET", theUrl, true);
        request.send(null);
    });
}

function quoteBuilder(author, quote, link) {
    var quoteHTML = "<div class='grant-iqs'><div class='grant-iqs-border'><span>\"" + quote + "\"<br/><br/></span><span class='grant-iqs-author'>-" + author + "</span></div></div>";
    return quoteHTML;
}

function parseJSONToGetQuote(json) {
    var author = json['author'];
    var quote = json['quote'];
    var link = "";
    
    var inspirationalQuoteString = quoteBuilder(author, quote, link);

    return inspirationalQuoteString;
}

// Find elements on screen
var timelineElement = document.querySelector('div#timeline');
var dashboardElement = document.querySelector('div.dashboard-right');

// Clear out the timeline
if (dashboardElement) 
    dashboardElement.innerHTML = "";

if (timelineElement)
    timelineElement.innerHTML = "";

// Attempt to get quote of the day
var httpPromise = Promise.resolve(makeHTTPRequest("https://talaikis.com/api/quotes/random/"));

httpPromise.then(function (response) {
    var json = JSON.parse(response['target']['response']);
    
    // Check response json to see if we're being rate limited
    if (json['error']) {
        return;
    }
    
    var quoteHTML = parseJSONToGetQuote(json);

    globalQuoteHTML = quoteHTML;
    timelineElement.innerHTML = quoteHTML;

}, function (error) {
    console.log(error);

    // Set default quote when the HTTP request fails
    globalQuoteHTML = quoteBuilder("Jordan B. Peterson", "Whether the gods are inside or outside makes very little difference to whether there are gods.", "");
    timelineElement.innerHTML = globalQuoteHTML;
}).then(function () {
    
});