const express = require('express');

const router = express.Router();
const movieController = require('../controllers/movies');
const { validateMovieId, validateCreateMovie } = require('../validation/validation');

// Роуты для фильмов
router.get('/movies', movieController.getSavedMovies);
router.post('/movies', validateCreateMovie, movieController.createMovie);
router.delete('/movies/:movieId', validateMovieId, movieController.deleteMovie);

module.exports = router;
