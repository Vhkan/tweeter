"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db` using saveTweet method
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.tweets.push(newTweet);
        //callback checks if the tweet is saved successfully, where null=no errors, true=successful operation
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first using getTweets method
    getTweets: function(callback) {
      simulateDelay(() => {
        //func for sorting tweets in ascending order based on their created_at property
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        //null argument represents an error obj (no errors in this case). Second argument are sorted tweets passed to the callback func 
        callback(null, db.tweets.sort(sortNewestFirst));
      });
    }
  };
};
