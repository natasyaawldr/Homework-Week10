const MovieRepository = require('../repositories/movieRepositories');

class MovieService {
    static getAllMovies(limit,page) {
        return MovieRepository.getAllMovies(limit,page);
    }

    static getMovieById(id) {
        return MovieRepository.getMovieById(id);
    }

    static addMovie(movieData) {
        return MovieRepository.addMovie(movieData);
    }

    static updateMovie(id, movieData) {
        return MovieRepository.updateMovie(id, movieData);
    }

    static putPhoto(id, photo) {
        return MovieRepository.putPhoto(id, photo);
    }

    static deleteMovie(id) {
        return MovieRepository.delete(id);
    }
}

module.exports = MovieService;