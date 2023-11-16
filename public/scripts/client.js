 /*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


 //Implementing create tweets function
const createTweetElement = function (data) {
//HTML tweets container
const $tweet = $(`     
<section class="tweets-container">
<div class="row-1">
  <div class="left-content">
    <div class="head-logo-name">
      <i class="fa-solid fa-user-ninja fa-xl" style="color: #45474B;"></i>
      <span class="name">${data.user.name}</span>
    </div>
  </div>
  <div class="right-content">${data.user.handle}</div>
</div>

<div class="row-2">
  <label class="tweets-line" for="all-tweets">${data.content.text}</label>
</div>

<div class="row-3">
  <div class="left-underline">
    <h5>${data.created_at}</h5> 
  </div>
  <div class="right-underline">
    <i class="flag-icon fa-solid fa-flag fa-sm"></i>
    <i class="retweet-icon fa-solid fa-retweet fa-sm"></i>
    <i class="heart-icon fa-solid fa-heart fa-sm"></i>          
  </div>
</div>

<div>
  <article class="tweet"></article>
</div>

</section>
`);

return $tweet;
};



const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  //To clean tweets
  $('.all-tweets').html('');
// loops through tweets
for (let tweet of tweets) {
  const newTweet = createTweetElement(tweet);
  $('.all-tweets').append(newTweet);
};
};


renderTweets(data);