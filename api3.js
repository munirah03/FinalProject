function movieSearch() {
    var movieTitle = document.getElementById("search-input").value;
  
    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=4b75f613&s=${encodeURIComponent(movieTitle)}`)
      .then((response) => response.json())
      .then((data) => {
        const resultsList = document.getElementById("resultsList");
        resultsList.innerHTML = '';
  
        if (data.Search && data.Search.length > 0) {
          const movies = data.Search;
  
          // Fetch detailed information for each movie and store in promises array
          const promises = movies.map((movie) =>
            fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=4b75f613`).then((response) => response.json())
          );
  
          // Resolve all promises and sort the movies based on ratings
          Promise.all(promises)
            .then((movieDataList) => {
              const sortedMovies = movieDataList.sort((a, b) => {
                // Assuming ratings are in format "X.X/10"
                const ratingA = parseFloat(a.imdbRating);
                const ratingB = parseFloat(b.imdbRating);
  
                return ratingB - ratingA; // Sort in descending order
              });
  
              // Display the sorted movies
              sortedMovies.forEach((movieData) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                  <div class="movie-info">
                    <img src="${movieData.Poster}" alt="${movieData.Title} Poster" />
                    <div>
                      <h3>${movieData.Title}</h3>
                      <p>Ratings: ${movieData.Ratings.map((rating) => rating.Value).join(', ')}</p>
                    </div>
                  </div>
                `;
                resultsList.appendChild(listItem);
              });
  
              // Call the function to display movie recommendations
              displayMovieRecommendations(sortedMovies);
            })
            .catch((error) => {
              console.error(error);
            });
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
  
