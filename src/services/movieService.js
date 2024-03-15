const Movie = require("../models/Movie");

const createMovie = async (movieData) => {
  try {
    const movie = await Movie.create(movieData);
    return movie;
  } catch (error) {
    throw error;
  }
};

const getAllMovies = async (userId) => {
  try {
    const movies = await Movie.find({userId: userId});
    return movies;
  } catch (error) {
    throw error;
  }
};

const getMovieByFilter = async (queryObj) => {
    try {
let movieDocuments = await Movie.find({queryObj: queryObj});
console.log("Movie Documents", movieDocuments)
const queryArr = Object.keys(queryObj);
if(queryArr.length === 0 ) {
  return movieDocuments;
}
if(queryArr.hasOwnProperty("genre")) {
  const genreArr = queryObj.genre.split(',');

  let filteredByGenres = [];
  genreArr.forEach((gen) => {
    filteredByGenres = [
      ...filteredByGenres,
      movieDocuments.filter((mov) => mov.genre = gen)
    ]
  });
  console.log("genreArr",genreArr)
  movieDocuments = filteredByGenres;

};

if(queryArr.hasOwnProperty("director")) {
  const directorArr = queryObj.director.split(',');

  let filteredByDirector = [];
  directorArr.forEach((dir) => {
    filteredByDirector = [
      ...filteredByDirector,
      movieDocuments.filter((mov) => mov.director = dir)
    ]
  });
  console.log("directorArr",directorArr)
  movieDocuments = filteredByDirector;

}
    } catch (error) {
      throw error;
    }
  };

const getMovieById = async (movieId, userId) => {
  try {
    const movie = await Movie.findOne({ userId: userId, _id: movieId });
    return movie;
  } catch (error) {
    throw error;
  }
};

const updateMovie = async (movieId, userId, updatedData) => {
  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: movieId, userId: userId },
      { $set: updatedData },
      { new: true }
    );

    return movie;
  } catch (error) {
    throw error;
  }
};

const deleteMovie = async (taskId, userId) => {
  try {
    const movie = await Movie.findOneAndDelete({ _id: taskId, userId: userId });
    console.log("movie",movie)
    return movie;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieByFilter,
  getMovieById,
  updateMovie,
  deleteMovie,
};
