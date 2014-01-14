var http = require("http");
var url = require("url");

function start(route, handle) {
	
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		
		if (pathname === "/favicon.ico") {
			//do nothing
		}	
		else {
			console.log("Request for " + pathname + " Received");
		}	
		route(handle, pathname, response, request);	
	}
	
	http.createServer(onRequest).listen(8888);
	console.log("Server running at port 8888");
}
exports.start = start;
