var request = require("request");
//This is how you call the API
//http://angularairline-plaul.rhcloud.com/api/flightinfo/SXF/2016-03-09T00:00:00.000Z/4
function getAvailableTickets(airport, date, numbOfTickets, callback) {
    var isoDate = date.toISOString();
    var URL =
        "http://angularairline-plaul.rhcloud.com/api/flightinfo/" + airport + "/" + isoDate + "/" + numbOfTickets;
    request(URL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            return callback(null, JSON.parse(body));
        }
        else {
            return callback(error, JSON.parse(body))
        }
    })
}
module.exports.getAvailTickets = getAvailableTickets;
