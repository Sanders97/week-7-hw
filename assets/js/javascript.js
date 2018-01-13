// Adding click event listen listener to all buttons
    $("button").on("click", function() {
      // Grabbing and storing the data-gif property value from the button
      var gif = $(this).attr("data-gif");
      // Constructing a queryURL using the gif name
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=dc6zaTOxFJmzC&limit=10";
      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
          console.log(queryURL);
          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;
          // Looping through each result item
          for (var i = 0; i < results.length; i++) {
            // Creating and storing a div tag
            var gifDiv = $("<div>");
            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);
            // Creating and storing an image tag
            var gifImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            gifImage.attr("src", results[i].images.fixed_height.url);
            // Appending the paragraph and image tag to the gifDiv
            gifDiv.append(p);
            gifDiv.append(gifImage);
            // Prependng the gifDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(gifDiv);
          }
        });
    });
    $(".document").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("gif-state");
      // If the clicked image's state is still, update its src attribute to what its gif-animate value is.
      // Then, set the image's gif-state to animate
      // Else set src to the gif-still value
      // I know I'm supposed to switch the image from a still to an animated and back again with an on.click, but not sure how to with random pictures
      if (state === "still") {
        $(this).attr("src", $(this).attr("gif-animate"));
        $(this).attr("gif-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("gif-still"));
        $(this).attr("gif-state", "still");
      }
    });