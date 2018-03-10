//NPM website for the twitter-stream-api package: https://www.npmjs.com/package/twitter-stream-api
//Github repo for twitter-steam-api package: https://github.com/trygve-lie/twitter-stream-api
var TwitterStream = require('twitter-stream-api'),
    fs = require('fs');

var keys = {
    consumer_key : "CJ2TwQVUxsWF9GWsg4l4tGFhC",
    consumer_secret : "Q3X9exLPiUYfbXJlpBF1YY5ovVwcbKLEk9RgmYJ7WagUcoqCFI",
    token : "908755810699956227-vi8N5hnzIURWgLpZhsRqaiO4WVSN5LI",
    token_secret : "UxK9w7qvFA9poWELQEKhBms9YV5raoqZ3PGRF4L1nKQAM"
};

var Twitter = new TwitterStream(keys, false);
Twitter.stream('statuses/filter', {
    track: 'wow',
    stall_warnings: true
});

// Twitter.debug(function (reqObj) {
//     require('request-debug')(reqObj, function (type, data, req) {
//         console.log(type, data, req);
//     });
// });

Twitter.on('connection success', function (uri) {
    console.log('connection success', uri);
});

Twitter.on('connection aborted', function () {
    console.log('connection aborted');
});

Twitter.on('connection error network', function (error) {
    console.log('connection error network', error);
});

Twitter.on('connection error stall', function () {
    console.log('connection error stall');
});

Twitter.on('connection error http', function (httpStatusCode) {
    console.log('connection error http', httpStatusCode);
});

Twitter.on('connection rate limit', function (httpStatusCode) {
    console.log('connection rate limit', httpStatusCode);
});

Twitter.on('connection error unknown', function (error) {
    console.log('connection error unknown', error);
    Twitter.close();
});

Twitter.on('data', function (obj) {
    console.log('data BUFFER', obj);
    console.log('string conversion of BUFFER',ab2str(obj))
    var tweet_string = ab2str(obj);
    var prettyTweet = JSON.stringify(JSON.parse(tweet_string),null,2)
    fs.appendFileSync('tweets_pretty.json', prettyTweet);
});

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

Twitter.pipe(fs.createWriteStream('tweets.json'));
