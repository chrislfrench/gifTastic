// It looks like you were trying to wrap your code in an IIFE (immediately invoked function expression)
// which is sweet and I strongly recommend you continue with that practice. Main thing to remember
// when doing that is to invoke the function
(function() {
 var movies = ["Dogs", "Cats", "Penguins", "Cheetahs"];
      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayMovieInfo() {
        var movie = $(this).attr("data-name");

        // Heroku is served over https (you can think of that as standing for `http secure`) which means it won't 
        // allow you to request resources over plain old http.
        // So, in order to make ajax calls from Heroku, you need to ensure that the protocol is set to https.
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=5&offset=0";
        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          // Creating a div to hold the movie
          // you generally want to remove console.log statements from production code
          // console.log(response);

          // you want to remove any prior gifs from the page before appending new ones
          $("#movies-view").empty()

          // since the movie buttons also have a class of `movie` you'll want a different class name
          // for this element. otherwise, this function is executed when a user clicks on a gif as
          // well as when the user clicks on a movie button.
          var movieDiv = $("<div class='gif-container'>");
          
          // Whenever you notice yourself writing the same logic multiple times, you should try
          // to find a way to pull all of the logic into a loop so as to only write it once.
          // For instance, the image appending logic could look like this:

          response.data.forEach(function(gifDatum) {
            var imageNode = $("<img class='pic'>");

            var stillUrl = gifDatum.images.fixed_height_still.url
            var animatedUrl = gifDatum.images.fixed_height.url

            imageNode.attr("src", stillUrl);

            // By setting these data attributes here you can determine whether to play or pause the gif
            imageNode.attr("data-still", stillUrl);
            imageNode.attr("data-animated", animatedUrl);

            movieDiv.append(imageNode);
          });

          // another big advantage to iterating over the response data in this way is that it
          // has the flexibility to append more or fewer images depending on the length of the
          // returned data array.

          // Putting the entire movie above the previous movies
          $("#movies-view").prepend(movieDiv);
        });
      }

      function toggleGif() {
        var currentSource = $(this).attr('src');
        var stillSource = $(this).attr('data-still');
        var animatedSource = $(this).attr('data-animated');

        // if the source url is the same as the still url, then we know 
        // the gif isn't currently animated so we can go ahead and animate it
        if ( stillSource === currentSource ) {
          $(this).attr('src', animatedSource);
        }
        // If the source url is different than the still url, then we know
        // the gif was animated so we can make it still
        else {
          $(this).attr('src', stillSource);
        }
      }

      // Very well written function 👌
      // Function for displaying movie data
      function renderButtons() {
        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Looping through the array of movies
        for (var i = 0; i < movies.length; i++) {
          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("movie");
          // Adding a data-attribute
          a.attr("data-name", movies[i]);
          // Providing the initial button text
          a.text(movies[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a movie button is clicked
      $("#add-movie").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var movie = $("#movie-input").val().trim();
        // a common practice is to remove the user's input from the html once you've retrieved its value
        // this gives the user an indication that their input is being processed
        $("#movie-input").val('');
        // Adding movie from the textbox to our array
        movies.push(movie);
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "movie"
      $(document).on("click", ".movie", displayMovieInfo);

      // adding a separate listener for the picture elements to determine whether they should be animated or not
      $(document).on('click', '.pic', toggleGif)

      // Calling the renderButtons function to display the intial buttons
      renderButtons();



       

// adding `()` to the end of a function declaration will invoke the function
})();

// console.log("js page is attached");
