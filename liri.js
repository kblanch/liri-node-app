var twitter = require('twitter');

var client = new twitter ({
    consumer_key: process.env.twitterKeys_Consumer_key,
    consumer_secret: process.env.twitterKeys_consumer_secret,
    access_token_key: process.env.twitterKeys_access_token_key,
    access_token_secret: process.env.twitterKeys_access_token_secret
});

var command = process.argv[2];

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