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
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <div class="movie-info">
              <img src="${movie.Poster}" alt="${movie.Title} Poster" />
              <div>
                <h3>${movie.Title}</h3>
                <p>Year: ${movie.Year}</p>
                <p>Movie ID: ${movie.imdbID}</p>
              </div>
            </div>
          `;
          resultsList.appendChild(listItem);
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
    })
}
