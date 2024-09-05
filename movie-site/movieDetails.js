const apiKey = "da0f65ed4b45ea3638f9a720a325a3c8";
const baseUrl = "https://api.themoviedb.org/3";
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
const movieDetailsUrl = `${baseUrl}/movie/`;

// Get the movie ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Get the container for movie details
const movieDetailsContainer = document.getElementById('movie-details');

// Fetch and display the movie details
async function getMovieDetails() {
  try {
      const res = await fetch(`${movieDetailsUrl}${movieId}?api_key=${apiKey}&language=en-US&append_to_response=videos,credits`);
      const movie = await res.json();

      movieDetailsContainer.innerHTML = `
          
          <img src="${movie.poster_path ? imageBaseUrl + movie.poster_path : 'https://via.placeholder.com/500x750'}" alt="${movie.title}">
          <div class="details">
              <h2>${movie.title}</h2>
              <p>${movie.overview}</p>
              <p><strong>Release Date:</strong> ${movie.release_date}</p>
              <p><strong>Runtime:</strong> ${movie.runtime} minutes</p>
              <p><strong>Genres:</strong> ${movie.genres.map((genre) => genre.name).join(", ")}</p>
              <p><strong>Cast:</strong> ${movie.credits.cast.slice(0, 5).map((actor) => actor.name).join(", ")}</p>
              <a href="index.html" class="back-button">Back to Home</a>
          </div>
      `;
  } catch (error) {
      console.error("Error fetching movie details:", error);
      movieDetailsContainer.innerHTML = `<p>Error loading movie details. Please try again later.</p>`;
  }
}

getMovieDetails(); // Call the function to load movie details