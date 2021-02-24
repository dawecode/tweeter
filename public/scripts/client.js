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
    $('#tweets-container').append(newTweet);
  }

};


$(document).ready(function () {

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
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  renderTweets(data);


  $('form').on('submit', function (event) {
    // prevent the default behavior of the form submission
    event.preventDefault();
    console.log('Submit form'); // always do these console.log every step of the way!!!
    // capture the content of the searchBox


    // Method #2: serialize => jQuery
    // Create a string in the format name=value&name=value...

    const tweetData = $(this).serialize();
    console.log(tweetData);

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: tweetData,
    }).then(res => console.log(res))
      .catch(res => console.log(res))

  });


});