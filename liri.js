var Twitter = require('twitter');
var keys = require('./keys.js')

var client = new Twitter ({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
});

var params = {
    screen_name: 'karette_',
    count: 20
};

var Spotify = require('node-spotify-api');
var spotify_client = new Spotify({
    id:'a11147c410fa4a329732f1b8d33a7468',
    secret:'3ebe3f75ccec48b18dbbab56b5272688'
});

var request = require('request');

var command = process.argv[2];
var value = process.argv[3];

switch(command){
    case "my-tweets":
        showTweets();
        break;
    case "spotify-this-song":
        songInfo();
        break;
    case "movie-this":
        movieInfo();
        break;
    case "do-what-it-says":
        action();
        break;
}

function showTweets(){
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            // console.log(tweets[0].text);
            tweets.forEach(function(element) {
                console.log(element.created_at + '\n' + element.text );
            });
        }
        else{
            console.log('Error!');
        }
    });
}

function songInfo(){
    for(i=4; i<process.argv.length; i++){
        value += " " + process.argv[i];
    }

    if(!value){
       value = 'The Sign'; 
    }

    spotify_client.search({type: 'track', query: value, limit: 1}, function(err,data){
        if(err){
            return console.log('Error!');
        }

        console.log('Artists: ' + data.tracks.items[0].artists[0].name);
        console.log('Song: ' + data.tracks.items[0].name);
        console.log('Preview Link: ' + data.tracks.items[0].preview_url);
        console.log('Album: ' + data.tracks.items[0].album.name);

    });
}

function movieInfo(){
    for(i=4; i<process.argv.length; i++){
        value += "+" + process.argv[i];
    }

    if(!value){
        value = 'Mr. Nobody';
    }

    var queryURL = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece";
    request(queryURL, function(error,response,body){
        if(error){
            console.log('Error!')
        }
        else{
            console.log(body);

            var movieData = JSON.parse(body);

            console.log('Title: ' + movieData.Title);
            console.log('Release Year: ' + movieData.Year);

            console.log('IMDB Rating: ' + movieData.imdbRating);
            //Rotten Tomatoes
            console.log(movieData.Ratings[1].Source + ': ' + movieData.Ratings[1].Value);
            //Country Produced
            console.log('Country: ' + movieData.Country);
            //Language
            console.log('Language: ' + movieData.Language);
            //Plot
            console.log('Plot: ' + movieData.Plot);
            //Actors
            console.log('Actors: ' + movieData.Actors);
        }
    });
}