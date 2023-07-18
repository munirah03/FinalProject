function movieSearch() {
    var movieTitle = document.getElementById("search-input").value;
  
    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=4b75f613&s=${encodeURIComponent(movieTitle)}`)
      .then((response) => response.json())
      .then((data) => {
        const resultsList = document.getElementById("resultsList");
        resultsList.innerHTML = '';
  
        if (data.Search && data.Search.length > 0) {
          const movies = data.Search;
  
          // Display the related movies
          movies.forEach((movie) => {
            fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=4b75f613`)
              .then((response) => response.json())
              .then((movieData) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                  <div class="movie-info">
                    <img src="${movie.Poster}" alt="${movie.Title} Poster" />
                    <div>
                      <h3>${movie.Title}</h3>
                      <p>Synopsis: ${movieData.Plot}</p>
                      <p>Cast and crew: ${movieData.Actors}</p>
                      <p>Release Date: ${movieData.Released}</p>
                      <p>Ratings: ${movieData.Ratings.map((rating) => `${rating.Source}: ${rating.Value}`).join(', ')}</p>
                    </div>
                  </div>
                `;
                resultsList.appendChild(listItem);
              })
              .catch((error) => {
                console.error(error);
              });
          });
  
          // Call the function to display movie recommendations
          displayMovieRecommendations(movies);
        } else {
          const listItem = document.createElement('li');
          listItem.textContent = 'No results found';
          resultsList.appendChild(listItem);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function goToHome() {
    // Redirect or perform the necessary action to go back to the home page
    window.location.href = "index.html";
  }

  function goToRecommend() {
    // Redirect or perform the necessary action to go back to the home page
    window.location.href = "api3.html";
  }

  function goToWatch() {
    // Redirect or perform the necessary action to go back to the home page
    window.location.href = "api4.html";
  }
  
  
  