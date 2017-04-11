var fs = require('fs');
var keys = require('./keys')
var command = process.argv[2];
var query = process.argv[3];

var operations = operationsFactory(param);

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

function operationsFactory(param){
	return{
		tweet: function(){

		},
		spotify: function(){

		},
		movie: function(){

		},
		whatever: function(){
			
		}
	}
}
