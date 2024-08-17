const movies = [
    {
      genre_ids: ["Animation", "Family", "Comedy", "Action"],
      id: 519182,
      poster_path:
        "https://image.tmdb.org/t/p/w500/wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      release_date: "2024-06-20",
      title: "Despicable Me 4",
      vote_average: 7.352,
    },
    {
      genre_ids: ["Drama", "Romance"],
      id: 1079091,
      poster_path:
        "https://image.tmdb.org/t/p/w500/tJSbiu7S5pqDnzH9weTW82bYbWu.jpg",
      release_date: "2024-08-07",
      title: "It Ends with Us",
      vote_average: 7.194,
    },
    {
      genre_ids: ["Action", "Thriller", "Drama", "Crime"],
      id: 1160018,
      poster_path:
        "https://image.tmdb.org/t/p/w500/m2zXTuNPkywdYLyWlVyJZW2QOJH.jpg",
      release_date: "2024-07-03",
      title: "Kill",
      vote_average: 7.315,
    },
    {
      genre_ids: ["Science Fiction", "Horror", "Thriller"],
      id: 945961,
      poster_path:
        "https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
      release_date: "2024-08-13",
      title: "Alien: Romulus",
      vote_average: 7.3,
    },
    {
      genre_ids: ["Horror", "Crime", "Mystery"],
      id: 1023922,
      poster_path:
        "https://image.tmdb.org/t/p/w500/ArvoFK6nlouZRxYmtIOUzKIrg90.jpg",
      release_date: "2024-07-04",
      title: "MaXXXine",
      vote_average: 6.308,
    },
    {
      genre_ids: ["Action", "Comedy", "Adventure"],
      id: 1051891,
      poster_path:
        "https://image.tmdb.org/t/p/w500/rUcuageYgv9SsJoWuc0seRWG6JC.jpg",
      release_date: "2024-06-21",
      title: "Thelma",
      vote_average: 7,
    },
    {
      genre_ids: ["Animation", "Action", "Drama"],
      id: 1104844,
      poster_path:
        "https://image.tmdb.org/t/p/w500/ae434jM5NG2kKX1rRkG5giMhpPI.jpg",
      release_date: "2024-04-19",
      title: "BLUE LOCK THE MOVIE -EPISODE NAGI-",
      vote_average: 8.3,
    },
    {
      genre_ids: ["Horror", "Thriller"],
      id: 646683,
      poster_path:
        "https://image.tmdb.org/t/p/w500/ar2h87jlTfMlrDZefR3VFz1SfgH.jpg",
      release_date: "2024-05-30",
      title: "The Exorcism",
      vote_average: 4.57,
    },
    {
      genre_ids: ["Horror", "Thriller"],
      id: 1010605,
      poster_path:
        "https://2.bp.blogspot.com/-Dzz8K1jb7ck/WFLG_tW4PYI/AAAAAAAAp8w/0aVe0NDBo6o4LHK9uHMcu8Ht3mFSImbXACLcB/s1600/The+Devil%27s+Spawn+Ebook+Cover.jpg",
      release_date: "2024-08-02",
      title: "The Devil's Spawn",
      vote_average: 5.9,
    },
    {
      genre_ids: ["Action", "Thriller"],
      id: 975542,
      poster_path:
        "https://www.mauvais-genres.com/18062-thickbox_default/the-infiltrator-movie-poster-15x21-in-2016-brad-furman-bryan-cranston.jpg",
      release_date: "2024-06-28",
      title: "Infiltrator",
      vote_average: 6.4,
    },
  ];
 

let favoriteMovies = [];
let addMovie = null;

const div = document.querySelector(".movie-list");
const divFavoriteList = document.querySelector(".favoritemovie-list");


const listMovies = function () {
  div.innerHTML = "";
  movies.forEach((movie) => {
    const cardMovie = `
    <div class = "movie">
    <img src="${movie.poster_path}">
    <h3>${movie.title}</h3>
    <p>${movie.genre_ids}</p>
    <p>${movie.vote_average}</p>
    <button id="${movie.id}">Add to Favorite</button>
    </div>`;
    div.insertAdjacentHTML("beforeend", cardMovie);
  });
 


  const buttonAdd = document.querySelectorAll(".movie button");
  buttonAdd.forEach((btnAdd, i) => {
    btnAdd.addEventListener("click", function () {
      addMovie = movies.slice(i, i+1);
   
      favoriteMovies.push({
        title: addMovie[0].title,
        id: addMovie[0].id,
      });

     
      const favoriteListMovies = function () {
        divFavoriteList.innerHTML = "";
        favoriteMovies.forEach((movie) => {
          const cardMovieAdd = `
            <div class = "add-list">
            <h3>${movie.title}</h3>
            <button id="${movie.id}">Delete</button>
            </div>`;
          divFavoriteList.insertAdjacentHTML("beforeend", cardMovieAdd);
        });

      
        const buttonDelete = document.querySelectorAll(".add-list button");
        buttonDelete.forEach((btnDelete, i) => {
          btnDelete.addEventListener("click", function () {
            favoriteMovies.splice(i, 1);
            favoriteListMovies();
          });
        });
      };
      favoriteListMovies();
    });
  });
};
listMovies();