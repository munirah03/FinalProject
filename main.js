const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsBody = document.getElementById('resultsBody');
const watchlistBody = document.getElementById('watchlistBody');
const watchlist = [];

searchButton.addEventListener('click', () => {
  const movieTitle = searchInput.value.trim();

  if (movieTitle) {
    movieSearch(movieTitle);
  }
});

function movieSearch(movieTitle) {
  fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=4b75f613&s=${encodeURIComponent(movieTitle)}`)
    .then((response) => response.json())
    .then((data) => {
      displaySearchResults(data.Search);
    })
    .catch((error) => {
      console.error(error);
    });
}

function displaySearchResults(results) {
  resultsBody.innerHTML = '';

  if (results && results.length > 0) {
    results.forEach((result) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${result.Title}</td>
        <td>${result.Year}</td>
        <td>${result.imdbID}</td>
        <td>
          <button onclick="addToWatchlist('${result.imdbID}')">Add to Watchlist</button>
        </td>
        <td></td>
      `;
      resultsBody.appendChild(row);
    });
  } else {
    const row = document.createElement('tr');
    row.innerHTML = '<td colspan="5">No results found.</td>';
    resultsBody.appendChild(row);
  }
}

function addToWatchlist(imdbID) {
  const movie = {
    imdbID: imdbID,
    title: '',
    year: ''
  };

  const resultRow = resultsBody.querySelector(`tr td:nth-child(3):not(:empty):not(:last-child)`).parentNode;
  const title = resultRow.querySelector('td:nth-child(1)').textContent;
  const year = resultRow.querySelector('td:nth-child(2)').textContent;
  movie.title = title;
  movie.year = year;

  if (!isInWatchlist(imdbID)) {
    watchlist.push(movie);
    displayWatchlist();
  }
}


function isInWatchlist(imdbID) {
  return watchlist.some(movie => movie.imdbID === imdbID);
}

function removeFromWatchlist(imdbID) {
  const index = watchlist.findIndex(movie => movie.imdbID === imdbID);
  if (index !== -1) {
    watchlist.splice(index, 1);
    displayWatchlist();
  }
}

function displayWatchlist() {
  watchlistBody.innerHTML = '';

  if (watchlist.length > 0) {
    watchlist.forEach((movie) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${movie.title}</td>
        <td>${movie.year}</td>
        <td>${movie.imdbID}</td>
        <td>${movie.watched ? 'Watched' : 'Not Watched'}</td>
        <td>
          <button onclick="removeFromWatchlist('${movie.imdbID}')">Delete</button>
        </td>
        <td>
          <button onclick="updateWatchedStatus('${movie.imdbID}')">Update</button>
        </td>
      `;
      watchlistBody.appendChild(row);
    });
  } else {
    const row = document.createElement('tr');
    row.innerHTML = '<td colspan="6">No movies in watchlist.</td>';
    watchlistBody.appendChild(row);
  }
}

function updateWatchedStatus(imdbID) {
  const movie = watchlist.find((movie) => movie.imdbID === imdbID);
  if (!movie) {
    return;
  }

  const isWatched = confirm('Has the movie been watched?');
  movie.watched = isWatched;

  displayWatchlist();
}





function goToHome() {
  // Redirect or perform the necessary action to go back to the home page
  window.location.href = "index.html";
}