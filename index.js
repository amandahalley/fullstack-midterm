const express = require("express");
const path = require("path");
const {
  getTopRatedMovies,
  getMoviesByGenre,
  getMovieDetailsById,
  selectRandomMovieId,
} = require("./utils/movieUtils");
const { Movies, Genres } = require("./utils/data");

const app = express();
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

// Home page route: Display 9 random movies
app.get("/", (req, res) => {
  const randomMovies = Movies.sort(() => 0.5 - Math.random()).slice(0, 9);
  res.render("index", { movies: randomMovies });
});

// Movie details route: Display details of a movie by ID
app.get("/movie/:id", (req, res) => {
  const movieId = parseInt(req.params.id); ///Converts id to int
  const movie = getMovieDetailsById(movieId); //Gets movie details based on ID

  //Check if movie exists in list
  //Retrieves list of movie in same genre excluding the current movie(up to 3 movies)
  if (movie) {
    const recommendations = Movies.filter(
      (m) => m.genre === movie.genre && m.id !== movie.id
    ).slice(0, 3);
    res.render("movie", { movie, recommendations });
  } else {
    res.status(404).send("Movie not found");
  }
});

// Randomly Generated Movie Route: Displays a random movie.
app.get("/movie", (req, res) => {
  const randomId = selectRandomMovieId(); //Selects random movie by ID from list of movies
  res.redirect(`/movie/${randomId}`); //Redirectst to movie page with details on selected movie
});

// Top-rated movies route: Display the top 15 movies by rating
app.get("/topRated", (req, res) => {
  const topRatedMovies = getTopRatedMovies(15);
  res.render("topRated", { movies: topRatedMovies });
});

// Upcoming movies route: Display upcoming movies
app.get("/upcoming", (req, res) => {
  const currentYear = new Date().getFullYear(); //Gets current year
  const upcomingMovies = Movies.filter(
    //Retrieves movies with release year greater then current
    (movie) => movie.releaseYear > currentYear
  ).slice(0, 5);
  res.render("upcoming", { movies: upcomingMovies }); //pass list of upcoming movies to template
});

// Movies by genre route: Display movies by genre
app.get("/movies/genre/:genre", (req, res) => {
  const genre = req.params.genre; //Takes genre from the route
  const moviesByGenre = getMoviesByGenre(genre, 10); //Gets list of movies for requested genre (10 movies total)

  //Checks for movies found for requested genre genre
  //If found, renders templates with genre and list of movies
  //Otherwise returns error message
  if (moviesByGenre.length > 0) {
    res.render("moviesByGenre", { genre, movies: moviesByGenre });
  } else {
    res.status(404).send("No movies found for the specified genre.");
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
