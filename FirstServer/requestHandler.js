var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');

function start(response) {
	console.log("Request handler 'start' was called.");
	
	var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html; '+
		'charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" enctype="multipart/form-data" '+
		'method="post">'+
		'<input type="file" name="upload">'+
		'<input type="submit" value="Upload file" />'+
		'</form>'+
		'</body>'+
		'</html>';
		
		response.writeHead(200, {"Content-Type":"text/html"});
		response.write(body);
		response.end();
}

function upload(response, request) {
	console.log("Request handler 'upload' was called.");
	
	var form = new formidable.IncomingForm();
	console.log("About to parse...");
	form.parse(request, function(error, fields, files) {
		console.log("Parsing done");
		
		/* Possible error on Windows systems: 
			tried to rename to an already existing file */
		fs.rename(files.upload.path, "/Temp/test.jpg", function(error) {
			if (error) {
				console.log("hit an error");
				fs.unlink("/Temp/test.jpg");
				console.log(files.upload.path);
				fs.rename(files.upload.path, "/Temp/test.jpg");
			}	
		});
		response.writeHead(200, {"Content-Type":"text/html"});
		response.write("received image: <br/>");
		response.write("<img src='/show' />");
		response.end();
	});
}

function show(response) {
	console.log("Request handler 'show' was called.");
	response.writeHead(200, {"Content-Type":"image/jpg"});
	fs.createReadStream("/Temp/test.jpg").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;