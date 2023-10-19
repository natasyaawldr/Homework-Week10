const MovieService = require('../services/movieServices');


class MovieController {
   async getAllMovies(req, res) {
        const limit = req.query.limit || 10;
        const page = req.query.page || 1;
    
        try {
            const result = await MovieService.getAllMovies(limit, (page - 1) * limit);
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

  async getMovieById(req, res) {
    const movieId = req.params.id;
    try {
      const movie = await MovieService.getMovieById(movieId);
      if (movie) {
        res.status(200).json({ movie });
      } else {
        res.status(404).json({ error: 'Film not found!!' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve movie data.' });
    }
  }

  async createMovie(req, res) {
    const movieData = req.body;

    try {
      const createdMovie = await MovieService.addMovie(movieData);
      res.status(201).json({ movie: createdMovie });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create the movie.' });
    }
  }

  async updateMovie(req, res) {
    const movieId = req.params.id;
    const movieData = req.body;

    try {
      const updatedMovie = await MovieService.updateMovie(movieId, movieData);
      if (updatedMovie) {
        res.json({ message : 'The Movie has been successfully Updated' });
      } else {
        res.status(404).json({ error: 'Film not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update the movie.' });
    }
  }

  async updatePhoto(req, res) {
    try {
        const { id } = req.params;
        if (req.file != null) {
            const imgName = req.file.filename;
            const file = `http://localhost:3000/public/upload/${imgName}`;
            const result = await MovieService.putPhoto(id, file);
            res.status(200).json({ message: "Successfully upload photo!" });
        } else {
            res.status(404).json({ message: "Photo cannot be null!" })
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

  async deleteMovie(req, res) {
    const movieId = req.params.id;

    try {
      await MovieService.deleteMovie(movieId);
      res.json({ message: 'The movie has been successfully deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete the movie.' });
    }
  }
}

module.exports = new MovieController();
