const pool = require ('../models/queries');

class Movies {
  
   static async getAllMovies(){
       try{
           const query = 'SELECT * FROM Movies';
           const result = await pool.query(query);
           return result;
       } catch (error){
           throw Error(error.message);
       }
    }

    static async getMovieById(movieId){
       try{
           const query = 'SELECT * FROM movies WHERE id = $1';
           const { rows } = await pool.query(query, [movieId]);
           return rows[0];
       } catch(error) {
         throw error;
       }
    }

    static async createMovie(movieData) {
     try {
       const query = 'INSERT INTO movies (id, title, genres, year) VALUES ($1, $2, $3, $4) RETURNING *';
       const values = [movieData.id, movieData.title, movieData.genres, movieData.year];
       const { rows } = await pool.query(query, values);
       return rows[0];
     } catch (error) {
       throw error;
     }
   }

    static async updateMovie(movieId, movieData) {
       try {
         const query = 'UPDATE movies SET title = $1, genres = $2, year = $3 WHERE id = $4 RETURNING *';
         const values = [movieData.title, movieData.genres, movieData.year, movieId];
         const { rows } = await pool.query(query, values);
         return rows[0];
       } catch (error) {
         throw error;
       }
     }

     static async updatePhoto(id, photo) {
       try {
         const query = 'UPDATE movies SET photo = $1 WHERE id = $2 RETURNING *';
         const result = await pool.query(query, [photo, id]);
         return result;
       } catch (error) {
         throw error;
       }
     }
   
     static async deleteMovie(movieId) {
       try {
         const query = 'DELETE FROM movies WHERE id = $1';
         await pool.query(query, [movieId]);
       } catch (error) {
         throw error;
       }
     }
}

module.exports = Movies;