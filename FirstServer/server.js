var http = require("http");
var url = require("url");

function start(route, handle) {
	
	function onRequest(request, response) {
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		
		if (pathname === "/favicon.ico") {
			//do nothing
		}	
		else {
			console.log("Request for " + pathname + " Received");
		}	
		
		request.setEncoding("utf8");
		
		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received POST data chunk '" + 
			postDataChunk + "'.");
		});
		
		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});
	}
	
	http.createServer(onRequest).listen(8888);
	console.log("Server running at port 8888");
}
exports.start = start;