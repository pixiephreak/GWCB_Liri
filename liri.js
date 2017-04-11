var fs = require('fs');
var keys = require('./keys');
var request = require('request');
var command = process.argv[2];
var queryArr = process.argv.slice(3);
var query = queryArr.join('+') || 'Mr. Nobody';
console.log(query);
var queryURl = `http://www.omdbapi.com/?t=${query}`;

var operations = operationsFactory();

switch (command){
	case 'my-tweet':
		operations.tweet();
		break;
	case 'spotify-this-song':
		operations.spotify();
		break
	case 'movie-this':
		operations.movie();
		break;
	case 'do-what-it-says':
		operations.whatever();
		break;
	default:
		console.log('Liri is not a witch. He can not do that.')
}

function operationsFactory(){
	return{
		tweet: function(){

		},
		spotify: function(){

		},
		movie: function(query){
			request(queryURl, function(error, response, body){
				if(!error && response.statusCode === 200){
					console.log(JSON.parse(body).Title);
					console.log(JSON.parse(body).Year);
					console.log(JSON.parse(body).Rated);
					console.log(JSON.parse(body).Country);
					console.log(JSON.parse(body).Language);
					console.log(JSON.parse(body).Plot);
					console.log(JSON.parse(body).Actors);
					var rotten = JSON.parse(body).Ratings[1];
					console.log(rotten.Source+': '+rotten.Value);
					console.log(JSON.parse(body).Website);


				}
			})

		},
		whatever: function(){

		}
	}
}
