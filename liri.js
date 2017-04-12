var fs = require('fs');
var request = require('request');
var command = process.argv[2];
var queryArr = process.argv.slice(3);
var movieQuery = queryArr.join('+') || 'Mr. Nobody';
var songQuery = queryArr.join('+') || 'The Sign';
var queryURl = `http://www.omdbapi.com/?t=${movieQuery}`;
var Twitter = require('twitter');
var keys = require('./keys');
var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});
var spotify = require('spotify');
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
      client.get('search/tweets', {q: 'washingtonpost',count: 20}, function(error, tweets, response) {
        if (!error) {
          tweets.statuses.forEach(function(tweet){
            console.log(`${tweet.text}`);
            console.log(`Tweeted on: ${tweet.created_at}`);
          })

        }
      });
		},
		spotify: function(){
      spotify.search({ type: 'track', query: songQuery , count: 5 }, function(err, data) {
        if ( err ) {
          console.log('Error occurred: ' + err);
          return;
        }

        data.tracks.items.forEach(function(entry){
          console.log(`Song Name: ${queryArr.join(' ')}`);
          console.log(`Album Name: ${entry.album.name}`);
          entry.album.artists.forEach(function(artist){
            console.log(`Artist: ${artist.name}`);
            console.log(`See more: ${artist.href}`);
          });
        })
});

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
