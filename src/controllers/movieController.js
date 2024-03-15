const movieService = require("../services/movieService");

const createMovie = async(req,res) => {
    try{
        const {title, director, genre, releaseYear, description} = req.body;
         userId = req.user.id;

        const movie = await movieService.createMovie({
            title,
            director,
            genre,
            releaseYear,
            description,
            userId
        });

        console.log("movie created", movie);
        res.status(201).json(movie)

    } catch(error){
        // console.log("error",error)
        res.status(500).json({message: error.message})
    }
};

const getAllMovies = async(req,res) => {
    try{
        const userId = req.user.id;
        const movies = await movieService.getAllMovies(userId);
        res.status(200).json(movies)
    } catch(error){
        res.status(500).json({message: error.message})
    }
};

const getMovieByFilter = async(req,res) => {
    try{
        const {query} = req;
        // console.log('query',query)
        console.log('request',req);
        const movies = await movieService.getMovieByFilter(query);
        
        res.status(200).json(movies)
    } catch(error){
        res.status(500).json({message: error.message})
    }
};

const getMovieById = async(req,res) => {
    try{
        const {id} = req.params;
       const userId = req.user.id;
       const movie = await movieService.getMovieById(id, userId);

       if(!movie){
        return res.status(404).json({message: "Movie NOT Found"})  //NOT FOUND
       }
       res.status(200).json(movie);
    } catch(error) {
        res.status(500).json({message: error.message})
    }
};

const updateMovie = async(req,res) => {
    try{
        const {id} = req.params;
        const userId = req.user.id;
        const updatedData = req.body;

        const movie = await movieService.updateMovie(id,userId,updatedData);

        if(!movie){
            return res.status(404).json({message: "Movie NOT Found"}); //NOT FOUND
        };

        res.status(200).json(movie)
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

const deleteMovie = async(req,res) => {
    try{
     const {id} = req.params;
     const userId = req.user.id;

     const success = await movieService.deleteMovie(id,userId);
     console.log("success", success);

     if(!success){
        res.status(404).json({message: "Movie NOT Found"})
     };

     res.status(204).send();
    } catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {createMovie, getAllMovies, getMovieByFilter, getMovieById, updateMovie, deleteMovie}