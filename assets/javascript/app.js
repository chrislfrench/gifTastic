// (function() {
 var movies = ["Dogs", "Cats", "Penguins", "Cheetahs"];
      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayMovieInfo() {
        var movie = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=5&offset=0";
        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          // Creating a div to hold the movie
          console.log(response);
          var movieDiv = $("<div class='movie'>");
    
          // Retrieving the URL for the image
          var imgURL = response["data"][0]["images"]["fixed_height"]["url"];
          // Creating an element to hold the image
          var image = $("<img class='pic'>").attr("src", imgURL);
          // Appending the image
          movieDiv.append(image);

          // Retrieving the URL for the image
          var imgURL1 = response["data"][1]["images"]["fixed_height"]["url"];
          // Creating an element to hold the image
          var image1 = $("<img class='pic'>").attr("src", imgURL1);
          // Appending the image
          movieDiv.append(image1);

          // Retrieving the URL for the image
          var imgURL2 = response["data"][2]["images"]["fixed_height"]["url"];
          // Creating an element to hold the image
          var image2 = $("<img class='pic'>").attr("src", imgURL2);
          // Appending the image
          movieDiv.append(image2);

          // Retrieving the URL for the image
          var imgURL3 = response["data"][3]["images"]["fixed_height"]["url"];
          // Creating an element to hold the image
          var image3 = $("<img class='pic'>").attr("src", imgURL3);
          // Appending the image
          movieDiv.append(image3);

          // Retrieving the URL for the image
          var imgURL4 = response["data"][4]["images"]["fixed_height"]["url"];
          // Creating an element to hold the image
          var image4 = $("<img class='pic'>").attr("src", imgURL4);
          // Appending the image
          movieDiv.append(image4);


          // Putting the entire movie above the previous movies
          $("#movies-view").prepend(movieDiv);
        });
      }
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
        // Adding movie from the textbox to our array
        movies.push(movie);
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });
      // Adding a click event listener to all elements with a class of "movie"
      $(document).on("click", ".movie", displayMovieInfo);
      // Calling the renderButtons function to display the intial buttons
      renderButtons();



       


// });	

console.log("js page is attached");