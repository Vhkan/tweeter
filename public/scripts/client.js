/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

//Implementing create tweets function
const createTweetElement = function(tweet) {
  //HTML tweets container
  const $tweet = $(`      
<section class="tweets-container">
<div class="row-1">
  <div class="left-content">
    <div class="head-logo-name">
    <img src="${tweet.user.avatars}"></i>
      <span class="name">${tweet.user.name}</span>
    </div>
  </div>
  <div class="right-content">${tweet.user.handle}</div>
</div>
<div class="row-2">
  <p class="tweets-line" for="all-tweets">${$('<div>').text(tweet.content.text).html()}</p>
</div>
<div class="row-3">
  <div class="left-underline">
    <h5>${timeago.format(tweet.created_at)}</h5> 
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

//Rendering our tweets on the page
const renderTweets = function(tweets) {
  $('.all-tweets').empty();
  for (let tweet of tweets) {
    const newTweet = createTweetElement(tweet);
    //Appending each new tweet element to the all-tweets container
    $('.all-tweets').append(newTweet);
  };
};

//An event listener that listens for the submit events
$("#create-new-tweet").on('submit', function(event) {
  event.preventDefault();

  //Hiding/popping error msg
  setTimeout(() => {
    $('.error-message').fadeOut('slow');
  }, 3000);
  
  $('#counter').text(140).removeClass().addClass('counterFontBlack');
  $('.error-message').empty();

  //function turns a set of form data into a query string
  const $formData = $(this).serialize();
  //getting tweets value
  const $tweetText = $('#tweet-text').val();

  //Tweets validation for no text/exceeding 140 chars 
  if (!$tweetText) {
    $(".error-message").append('<i class="fa-solid fa-triangle-exclamation error-message"></i> The tweet should contain text! <i class="fa-solid fa-triangle-exclamation error-message"></i>').slideDown();
  } else if ($tweetText.length > 140) {
    $(".error-message").append('<i class="fa-solid fa-triangle-exclamation error-message"></i> The tweet text should not exceed 140 characters! <i class="fa-solid fa-triangle-exclamation error-message"></i>').slideDown();
  } else {
    //AJAX POST request that sends the form data to the server
    $.ajax({
      url: '/tweets',
      data: $formData,
      method: "POST",
    }).then(() => {
      $('#tweet-text').val("");
      loadTweets();
    }).catch((error) => {
      console.log(error);
    });
  }
});


//Function for fetcing/GET tweets from localhost
const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: 'json'
  }).then((tweets) => {
    //Sorting twets by the date created_at
    const sortedTweets = tweets.sort((x, y) => new Date(y.created_at) - new Date(x.created_at));
    renderTweets(sortedTweets);
  }).catch((error) => {
    console.log("Error is:", error);
  })
};

loadTweets();