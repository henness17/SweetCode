//////////// index.js setup
var express = require('express');
var twit = require('twit');
var request = require('request');

var app = express();
app.set('port', process.env.PORT || 5000);

if(process.env.TWITTER_CONSUMER_KEY == undefined){
  require('./env.js');
}

var bot = new twit({
  consumer_key:         process.env.TWITTER_CONSUMER_KEY,
  consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
  access_token:         process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests. 
})
///////////////////////////////////

// Callback chain
var sendTweet = function(){
  var randomWord;
  getWord(nowGetRhymingWord);
  function nowGetRhymingWord(randomWord){
    var rhymingWord;
    getRhymingWord(randomWord, nowGetRhymingDef);
    function nowGetRhymingDef(rhymingWord){
      var definition;
      getRhymingDef(rhymingWord, nowReturnTweet);
      function nowReturnTweet(definition){
        var wordAndDef = capitalizeFirstLetter(randomWord) + ": " + rhymingDef;
        bot.post('statuses/update', { status: wordAndDef }, function(err, data, response) {
          console.log("Success!");
        });
      }
    }
  }
}
 
// Send tweet every 28 minutes, and on start
setInterval(function() {
  sendTweet();
}, 1700000);
sendTweet();

// Global variables needed to create the tweet
var randomWord;
var rhymingWord;
var rhymingDef;

function getWord(callback){
  randomWord = 'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=' + process.env.WORDNIK_KEY;
  request(randomWord, function (error, response, body) {
    randomWord = JSON.parse(body).word;
    callback(randomWord);
  });
};

function getRhymingWord(randomWord, callback){
  rhymingWord = 'http://api.wordnik.com:80/v4/word.json/' + randomWord + '/relatedWords?useCanonical=false&relationshipTypes=rhyme&limitPerRelationshipType=10&api_key=' + process.env.WORDNIK_KEY;
    request(rhymingWord, function (error, response, body) {
    try{
      rhymingWord = JSON.parse(body)[0].words[0];
      callback(rhymingWord);
    }catch(err){
      sendTweet(); // The word didn't rhyme with anything... restart
    }
  });
};

function getRhymingDef(rhymingWord, callback){
  rhymingDef = 'http://api.wordnik.com:80/v4/word.json/' + rhymingWord + '/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=' + process.env.WORDNIK_KEY;
  request(rhymingDef, function (error, response, body) {
    rhymingDef = JSON.parse(body)[0].text;
    callback(rhymingDef);
  });  
};

// Helper function for to capitalize the random word
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Tells the Express app to listen to a port
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
