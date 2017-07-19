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

