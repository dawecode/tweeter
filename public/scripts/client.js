/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 //create tweets
const createTweetElement = function (tweetObj) {
  const timeStamp = moment(tweetObj.created_at).fromNow();
  let $tweet = $(` 
  <article>
  <header>
    <span class="user"><img class="user" src="${tweetObj.user.avatars}" alt="Face Logo Image">
    <p>${tweetObj.user.name}</p></span>
    <p class="handle">${tweetObj.user.handle}</p>
  </header>
    <p class="profile-tweet">${tweetObj.content.text}</p>
  
  <footer>
    <span class ="time">${timeStamp}</span>
    <span class ="buttons"> 
      <i class="fas fa-flag"></i> 
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
      </article>` );

  return $tweet;
};

//render tweets
const renderTweets = function (tweets) {
  // loops through tweets
  for (let tweet of tweets) {
    const newTweet = createTweetElement(tweet)
    $("#tweets-container").prepend(newTweet);
  }

};



const loadTweets = function() {
  // Send a request to the API with Ajax
  // Ajax calls are asynchronous
  $.ajax({
    url:"/tweets",
    method: "GET"
  })
    .done((data) => {

      // empty the container
      $('#tweet-container').empty();

      // success! we're getting the data back :)
      console.log(data);
      renderTweets(data);

    })
    .fail((err) => {
      // fail case
      console.log(err.message);
    })
    .always(() => console.log('request to the API has been performed'));
};


$(document).ready(function () {

  $("form").on("submit", function (event) {
    // prevent the default behavior of the form submission
    event.preventDefault();
    console.log("Submit form"); 
    
    // Create a string in the format name=value&name=value...
    const tweetData = $(this).serialize();
    console.log(tweetData);

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: tweetData,
    }).then(loadTweets)
      .catch(res => console.log(res))

  });
  
  loadTweets();
  
});