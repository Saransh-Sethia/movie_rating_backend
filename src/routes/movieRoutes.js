const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const authenticateToken = require("../middleware/authenticateToken")

//POST a Movie
router.post("/", authenticateToken, movieController.createMovie);

//GET All Movies
router.get("/", authenticateToken, movieController.getAllMovies);

//GET Movies by filter
router.get("/", authenticateToken, movieController.getMovieByFilter);

//GET Movie By ID
router.get("/:id", authenticateToken, movieController.getMovieById);

//Update Movie
router.put("/:id", authenticateToken, movieController.updateMovie);

//DELETE Movie
router.delete("/:id", authenticateToken, movieController.deleteMovie);

//POST Review
// router.post("/:id/reviews",authenticateToken, reviewController.createReview);

module.exports = router;