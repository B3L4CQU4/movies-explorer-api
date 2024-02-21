const Movie = require('../models/movies');
const NotFound = require('../errors/notFound');
const NotOwner = require('../errors/notOwner');
const {
  OK_CODE,
  CREATED_CODE,
  MOVIE_NOT_FOUND,
  NOT_MOVIE_OWNER,
} = require('../config');

// GET /movies
const getSavedMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    res.status(OK_CODE).json(movies);
  } catch (error) {
    next(error);
  }
};

// POST /movies
const createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  try {
    const owner = req.user._id;
    const newMovie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    });
    res.status(CREATED_CODE).json(newMovie);
  } catch (error) {
    next(error);
  }
};

// DELETE /movies/:movieId
const deleteMovie = async (req, res, next) => {
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId);

    const userId = req.user._id;

    if (!movie) {
      throw new NotFound(MOVIE_NOT_FOUND);
    } else if (movie.owner.toString() !== userId) {
      throw new NotOwner(NOT_MOVIE_OWNER);
    } else {
      const deletedMovie = await Movie.findByIdAndDelete(movieId);
      res.status(OK_CODE).json(deletedMovie);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSavedMovies,
  createMovie,
  deleteMovie,
};
