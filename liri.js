
var keys = require("./keys.js");

var request = require('request');
var Spotify = require('node-spotify-api');
var fs = require('fs');

var input = process.argv;
var action = input[2];
var inputs = input[3];

switch (action) {
	case "concert-this":
	concert(inputs);
	break;

	case "spotify-this-song":
	spotify(inputs);
	break;

	case "movie-this":
	movie(inputs);
	break;

	case "do-what-it-says":
	doit();
	break;
};

function concert(inputs) {
	var artist = process.argv.slice(3).join(" ")
    console.log(artist);
   
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=unccbootcamp";

    request(queryURL, function (error, response, body) {
        if (error) console.log(error);
        var result  =  JSON.parse(body)[0];
        console.log("Venue name " + result.venue.name);
        console.log("Venue location " + result.venue.city);
        console.log("Date of Event " +  moment(result.datetime).format("MM/DD/YYYY"));
       
		});

}

function spotify(inputs) {

	var spotify = new Spotify(keys.spotifyKeys);
		if (!inputs){
        	inputs = 'Old Town Road';
    	}
		spotify.search({ type: 'track', query: inputs }, function(err, data) {
			if (err){
	            console.log('Error occurred: ' + err);
	            return;
	        }

	        var songInfo = data.tracks.items;
	        console.log("Artist(s): " + songInfo[0].artists[0].name);
	        console.log("Song Name: " + songInfo[0].name);
	        console.log("Preview Link: " + songInfo[0].preview_url);
	        console.log("Album: " + songInfo[0].album.name);
	});
}


function movie(inputs) {

	var queryUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=40e9cece";

	request(queryUrl, function(error, response, body) {
		if (!inputs){
        	inputs = 'Get Out';
    	}
		if (!error && response.statusCode === 200) {

		    console.log("Title: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		    console.log("Country: " + JSON.parse(body).Country);
		    console.log("Language: " + JSON.parse(body).Language);
		    console.log("Plot: " + JSON.parse(body).Plot);
		    console.log("Actors: " + JSON.parse(body).Actors);
		}
	});
};

function doit() {
	fs.readFile('random.txt', "utf8", function(error, data){

		if (error) {
    		return console.log(error);
  		}

		// Then split it by commas (to make it more readable)
		var dataArr = data.split(",");

		// Each command is represented. Because of the format in the txt file, remove the quotes to run these commands. 
		if (dataArr[0] === "spotify-this-song") {
			var songcheck = dataArr[1].slice(1, -1);
			spotify(songcheck);
		} else if (dataArr[0] === "concert-this") {
			var concert = dataArr[1].slice(1, -1);
			concert(concert_info);
		} else if(dataArr[0] === "movie-this") {
			var movie_name = dataArr[1].slice(1, -1);
			movie(movie_name);
		} 
		
  	});

};

