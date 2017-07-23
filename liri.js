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

var fs = require('fs');

var command = process.argv[2];
var value = process.argv[3];

switchCommand();

function switchCommand(){
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
        default:
            console.log(command + ' is not a command');
            break;
    }
}

function showTweets(){
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
            console.log(error);
        }
        else{
            // console.log(tweets[0].text);
            var outputTweets = '20 Tweets \n' + '-------------------';
            tweets.forEach(function(element) {
                outputTweets += '\n' + element.created_at + '\n' + element.text + '\n-------------------------------------';
            });

            console.log(outputTweets + '\n');
            logFile(outputTweets + '\n');
        }
    });
}

function songInfo(){
    for(i=4; i<process.argv.length; i++){
        value += " " + process.argv[i];
    }

    if(!value){
       value = 'The Sign Ace of Base'; 
    }

    spotify_client.search({type: 'track', query: value, limit: 1}, function(error,data){
        if(error){
            return console.log(error);
        }
        else{
            var songData = data.tracks.items[0];

            var outputSong = '\nArtists: ' + songData.artists[0].name + '\n' 
                        + 'Song: ' + songData.name + '\n' 
                        + 'Preview Link: ' + songData.preview_url + '\n' 
                        + 'Album: ' + songData.album.name + '\n';
            
            console.log(outputSong);
            logFile(outputSong);
        }
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
            console.log(error);
        }
        else{
            var movieData = JSON.parse(body);
            var rottenTomatoesRating = 'Not Available';
            
            if(movieData.Ratings){
                movieData.Ratings.forEach(function(element){
                    if(element.Source === 'Rotten Tomatoes'){
                        rottenTomatoesRating = element.Value;
                    }
                });
            }

            var outputMovie = '\nTitle: ' + movieData.Title + '\n'
                        + 'Release Year: ' + movieData.Year + '\n'
                        + 'IMDB Rating: ' + movieData.imdbRating + '\n'
                        + 'Rotten Tomatoes: ' + rottenTomatoesRating + '\n'
                        + 'Country: ' + movieData.Country + '\n'
                        + 'Language: ' + movieData.Language + '\n'
                        + 'Plot: ' + movieData.Plot + '\n'
                        + 'Actors: ' + movieData.Actors + '\n';

            console.log(outputMovie);
            logFile(outputMovie);
        }
    });
}

function action(){
    fs.readFile('random.txt','utf8',function(error,data){
        if(error){
            return console.log(error);
        }
        else{
            var text = data.split(',');
            command = text[0];
            value = text[1].replace(/\"/g, "");
            //value = text[1].substr(1).slice(0,-1);

            switchCommand();
        }
    });
}

function logFile(newData){
    fs.appendFile('log.txt',newData, function(error){
        if(error){
            console.log(error);
        }
        else{
            console.log('Saved');
        }
    });
}