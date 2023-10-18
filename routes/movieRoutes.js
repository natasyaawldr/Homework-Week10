const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const upload = require('../middleware/multer.js');
const verify = require('../middleware/athentication');
const authorization = require('../middleware/authorization');

// Definisikan rute-rute API untuk film di sini.
router.get('/',  movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);
router.post('/', verify,authorization, movieController.createMovie);
router.put('/:id',verify,authorization, movieController.updateMovie);
router.put('/:id/upload', upload.single('photo'), movieController.updatePhoto);
router.delete('/:id', verify,authorization, movieController.deleteMovie);

module.exports = router;
