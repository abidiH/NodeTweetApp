var express = require("express");
var app = express();
var io = require('socket.io');
var port = 8080;
var twitter = require("ntwitter");


var tw = new twitter({
consumer_key : '1dZOyqWvWrKmuokbGkFlMgD7A',
consumer_secret : 'AFQ8i8m7LejoNdnqnF5jqLCJuwmeFKgDRPVzDoHZ5iSDrMeYkS',
access_token_key : '1283871895-FfNCVaSpz01xGeK5ZtDhMpVeWys5l41nI7F7rIJ',
access_token_secret : '4rZOfTRR5t93x213Tj1JC7YqzQnS6Ny32aCIVZUY7Kzcz'

})


app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.get("/", function(req,res){
	res.sendFile(__dirname + '/index.html');
})

var server = io.listen(app.listen(port));

server.on('connection' , function(socket){

	tw.stream("statuses/filter", { track: 'love'},function(stream){
		stream.on('data', function(tweet){

			socket.emit("message", tweet);
		});

		stream.on('error', function(error, code) {
   			 console.log("My error: " + error + ": " + code);
		});
		
	})


})

console.log("listening on the port " + port);
