//Settting the character counter
$(document).ready(function() {
  console.log("Link works");
  $('#tweet-text').on('input', function() {
    const tweet = $(this).val();
    let tweetLength = tweet.length;
    let charLeft = 140 - tweetLength;

    //Updating the counter display
    $('#counter').text(charLeft);
    //Applying styles on remaining symbols
    if (charLeft < 0) {
      $('#counter').addClass('counterFontRed');
    } else {
      $('#counter').addClass('counterFontBlack');
    };
  });
});
