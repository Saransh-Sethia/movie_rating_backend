const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const authenticateToken = require("../middleware/authenticateToken")

//POST Review
router.post("/:id/reviews",authenticateToken, reviewController.createReview);

//GET all Reviews
router.get("/:id/reviews",authenticateToken, reviewController.fetchReviews);


module.exports = router;