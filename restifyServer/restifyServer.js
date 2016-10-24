
var restify = require('restify');
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var server = restify.createServer({
  name: 'MyApp',
});

server.use(restify.bodyParser());

server.listen(8080);

console.log("Server listening on 8080 !");

function post(req, res, next) {
	if ( req.params.token != 'w50VltPOLzwUYAhT00H4CgZI' ) {
		res.send("The token for the slash command doesn't match. Check your script. " );
	} else {
		var post_data = {"id" : "festifyUrl", "content" : req.params.text};
		var post_options = {
			host: "localhost",
			port: "3000",
			method: "POST",
			path: "/connit",
			headers: {
				'Content-Type': 'application/json'
			}
			//json: {"id" : "festifyUrl", "content" : req.body.text } 
			//json: JSON.parse('{"id" : "festifyUrl", "content" :' + req.body.text+' }') 
		};
		var post_req = http.request(post_options, function(response) {
			response.setEncoding('utf8');
			var str = '';
			response.on('data', function (chunk) {
				str += chunk;
			});
  			response.on('end', function (response)  {
				var json = JSON.parse(str);
				var botResponse = "*" + req.params.user_name + "* changed the festify link to " + json.content;
				res.end(botResponse);
			});
		});
		post_req.end(JSON.stringify(post_data));
	}
	return next();	
}

function get(req, res, next) {
	if ( req.params.token != 'nAzdDO800ys0JXgIwLkPScH4' ) {
		console.log("token: " + req.body.token);
		res.send("The token for the slash command doesn't match. Check your script.");
	} else {
		var get_options = {
			host: "localhost",
			port: "3000",
			method: "GET",
			path: "/connit/festifyUrl",
		};
		var get_req = http.request(get_options, function(response) {
			response.setEncoding('utf8');
			var str = '';
			response.on('data', function (chunk) {
				str += chunk;
			});
  			response.on('end', function (response)  {
				var json = JSON.parse(str);
				var botResponse = "Hey *" + req.params.user_name + "*, the festify link is " + json.content;
				res.end(botResponse);
  			});
		});
		get_req.end();
	}
	return next();	
}


server.post('/connit/getFestify', get);
server.post('/connit/setFestify', post);
