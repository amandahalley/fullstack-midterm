const {
  getMoviesByGenre,
  getTopRatedMovies,
  formatMovieData,
  getRandomGenre,
  generateMovieReport,
  getMovieDetailsById,
  selectRandomMovieId,
} = require("../../utils/movieUtils");
const { Movies } = require("../../utils/data");

describe("Movie Utility Functions", () => {
  describe("getMoviesByGenre", () => {
    test("should return 2 movies from Action", () => {
      const genre = "Action";
      const result = getMoviesByGenre(genre, 2);
      expect(result).toBeDefined();
      expect(result.length).toBeLessThanOrEqual(2);
      result.forEach((movie) => {
        expect(movie.genre).toBe(genre);
      });
    });
  });

  describe("getTopRatedMovies", () => {
    test("should return the top-rated movies up to 5", () => {
      const count = 5;
      const result = getTopRatedMovies(count);
      expect(result).toBeDefined();
      expect(result.length).toBeLessThanOrEqual(count);
      result.forEach((movie) => {
        expect(movie.rating).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe("getMovieDetailsById", () => {
    test("should return movie details ID 7 (Forrest Gump)", () => {
      const movieId = 7;
      const result = getMovieDetailsById(movieId);
      expect(result).toBeDefined();
      expect(result.id).toBe(movieId);
    });
  });

  describe("selectRandomMovieId", () => {
    test("should return a random movie ID from the movies", () => {
      const randomId = selectRandomMovieId();
      expect(randomId).toBeDefined();
      expect(Movies.some((movie) => movie.id === randomId)).toBe(true);
    });
  });
});
