var globalQuoteHTML = "";

function makeHTTPRequest(theUrl)
{
    return new Promise(function (resolve, reject) {
        
        var request = new XMLHttpRequest();
        request.onload = resolve;
        request.onerror = reject;
        request.open("GET", theUrl, true); // true for asynchronous 
        request.send(null);
    });
}

function quoteBuilder(author, quote, link) {
    var quoteHTML = "<div class='grant-iqs'><span>\"" + quote + "\"<br/><br/></span><span class='grant-iqs-author'>-" + author + "</span></div>";
    return quoteHTML;
}

function parseJSONToGetQuote(json) {
    var author = json['contents']['quotes'][0]['author'];
    var quote = json['contents']['quotes'][0]['quote'];
    var link = json['contents']['quotes'][0]['permalink'];

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

// Start listening to the page for changes
document.addEventListener('DOMSubtreeModified', function () {
    // if (timelineElement.innerHTML != globalQuoteHTML)
    //     timelineElement.innerHTML = globalQuoteHTML;
});

// Set default quote
globalQuoteHTML = quoteBuilder("By Me", "This is an inspirational quote", "");
timelineElement.innerHTML = globalQuoteHTML;

// Attempt to get quote of the day
var httpPromise = Promise.resolve(makeHTTPRequest("https://quotes.rest/qod.json"));

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
}).then(function () {
    
});