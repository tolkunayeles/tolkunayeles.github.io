const apiKey = "da0f65ed4b45ea3638f9a720a325a3c8";
const baseUrl = "https://api.themoviedb.org/3";
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

const nowPlayingUrl = `${baseUrl}/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
const searchUrl = `${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=`;
const movieDetailsUrl = `${baseUrl}/movie/`;

const moviesContainer = document.getElementById("movies");
const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const modal = document.getElementById("movie-modal");
const modalContent = document.getElementById("modal-body");
const closeBtn = document.querySelector(".close-button");
const favoritesList = document.getElementById("favorites-list");

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

async function getNowPlayingMovies() {
    try {
        const res = await fetch(nowPlayingUrl);
        const data = await res.json();
        displayMovies(data.results);
    } catch (error) {
        console.error("Error fetching now playing movies:", error);
    }
}

function displayMovies(movies) {
    moviesContainer.innerHTML = "";

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, id } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
            <img src="${poster_path ? imageBaseUrl + poster_path : 'https://via.placeholder.com/500x750'}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average.toFixed(1)}</span>
                <button onclick="addToFavorites(${id}, '${title}')">Add to Favorites</button>
            </div>
        `;

        movieEl.querySelector("img").addEventListener("click", () => {
            openModal(id);
        });

        moviesContainer.appendChild(movieEl);
    });
}

function getColor(vote){
    if (vote>=8){
        return 'green'
    }else if(vote>=5){
        return 'orange'
    }else{
        return 'red'
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value;

    if (searchTerm && searchTerm !== "") {
        searchMovies(searchTerm);
        searchInput.value = "";
    } else {
        window.location.reload();
    }
});

async function searchMovies(query) {
    try {
        const res = await fetch(searchUrl + query);
        const data = await res.json();
        displayMovies(data.results);
    } catch (error) {
        console.error("Error searching movies:", error);
    }
}

async function openModal(movieId) {
    try {
        const res = await fetch(
            `${movieDetailsUrl}${movieId}?api_key=${apiKey}&language=en-US&append_to_response=videos,credits`
        );
        const movie = await res.json();

        modalContent.innerHTML = `
            <img src="${movie.poster_path ? imageBaseUrl + movie.poster_path : 'https://via.placeholder.com/500x750'}" alt="${movie.title}">
            <div class="details">
                <h2>${movie.title}</h2>
                <p>${movie.overview}</p>
                <p><strong>Release Date:</strong> ${movie.release_date}</p>
                <p><strong>Runtime:</strong> ${movie.runtime} minutes</p>
                <p><strong>Genres:</strong> ${movie.genres.map((genre) => genre.name).join(", ")}</p>
                <p><strong>Cast:</strong> ${movie.credits.cast.slice(0, 5).map((actor) => actor.name).join(", ")}</p>
            </div>
        `;

        modal.style.display = "block";
    } catch (error) {
        console.error("Error fetching movie details:", error);
    }
}

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

function addToFavorites(id, title) {
    // Check if the movie is already in favorites
    if (favorites.some(movie => movie.id === id)) {
        alert(`${title} is already in your favorites!`);
        return;
    }

    // Add the new movie to the favorites list
    favorites.push({ id, title });

    // Save back to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));

    alert(`${title} has been added to your favorites!`);
    displayFavorites(); // Update the favorites list after adding a new favorite
}

function displayFavorites() {
    favoritesList.innerHTML = '';

    favorites.forEach(movie => {
        const favoriteElement = document.createElement('li');
        favoriteElement.innerHTML = `
            ${movie.title}
            <button onclick="removeFromFavorites(${movie.id})">Remove</button>
        `;
        favoritesList.appendChild(favoriteElement);
    });
}

function removeFromFavorites(id) {
    // Filter out the movie with the given id
    favorites = favorites.filter(movie => movie.id !== id);

    // Save the updated list back to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Update the favorites display
    displayFavorites();
}

// Load now playing movies and favorites on page load
getNowPlayingMovies();
displayFavorites();