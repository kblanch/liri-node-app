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

var command = process.argv[2];
var value = process.argv[3];

for(i=3; i<process.argv.length; i++){
    value += " " + process.argv[i];
}


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
    if(!value){
       value = 'The Sign'; 
    }
    spotify_client.search({type: 'track', query: value, limit: 1}, function(err,data){
        if(err){
            return console.log('Error!');
        }

        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].preview_url);
        console.log(data.tracks.items[0].album.name);

    });
}
