//escaping a script
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


//create tweets
const createTweetElement = function(tweetObj) {
  const timeStamp = moment(tweetObj.created_at).fromNow();
  let $tweet = $(` 
  <article>
  <header>
    <span class="user"><img class="user" src="${tweetObj.user.avatars}" alt="Face Logo Image">
    <p>${tweetObj.user.name}</p></span>
    <p class="handle">${tweetObj.user.handle}</p>
  </header>
    <p class="profile-tweet">${escape(tweetObj.content.text)}</p>
  
  <footer>
    <span class ="time">${timeStamp}</span>
    <span class ="buttons"> 
      <i class="fas fa-flag"></i> 
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
      </article>`);

  return $tweet;
};

//render tweets
const renderTweets = function(tweets) {
  // loops through tweets
  for (let tweet of tweets) {
    const newTweet = createTweetElement(tweet);
    $("#tweets-container").prepend(newTweet);
  }
};


// load tweets with Ajax get request inside
const loadTweets = function() {
  $.ajax({
    url: "/tweets",
    method: "GET"
  })
    .done((data) => {
      renderTweets(data);
    })
    .fail((err) => {
      // fail case
      console.log(err.message);
    })
    .always(() => console.log('request to the API has been performed'));
};

// doc ready
$(document).ready(function() {

  $("form").on("submit", function(event) {
    // prevent the default behavior of the form submission
    event.preventDefault();
    console.log("Submit form");
    
    // Create a string in the format name=value&name=value...
    const tweetData = $(this).serialize();
    // Create a variable that finds the text length
    const numbChar = $(".new-tweet").find("textarea").val().length;
    //conditions if text is over 140 or empty
    if (numbChar > 140) {
      $(".error1").text("Character number exceeded").slideDown();
    
    } else if (numbChar === 0) {
      $(".error2").text("Please write a message").slideDown();
  
    } else {
      //slide up when error corrected
      $(".error1").slideUp();
      $(".error2").slideUp();
      //ajax POST
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: tweetData,
      }).then(loadTweets)
        .catch(res => console.log(res));
      //clear form
      $(".new-tweet").find("form").trigger("reset");
      //reset counter
      $(".counter").text(140);
    }
  });
  
  loadTweets();
  
});