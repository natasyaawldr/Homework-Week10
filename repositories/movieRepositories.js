const Movie = require('../models/movieModel');

class MovieRepository {
    static getAllMovies(limit,page) {
        return Movie.getAllMovies(limit,page);
    }

    static getMovieById(id) {
        return Movie.getMovieById(id);
    }

    static addMovie(movieData) {
        return Movie.createMovie(movieData);
    }

    static updateMovie(id, movieData) {
        return Movie.updateMovie(id, movieData);
    }

    static putPhoto(id, photo) {
        return Movie.updatePhoto(id, photo);
    }

    static delete(id) {
        return Movie.deleteMovie(id);
    }
}

module.exports = MovieRepository;