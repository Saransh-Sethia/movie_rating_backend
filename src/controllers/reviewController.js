const reviewService = require("../services/reviewService");


const createReview = async(req,res) => {
    try{
const {rating, review} = req.body;

const reviews= await reviewService.createReview({
    rating,
    review,
});
console.log('reviews created', reviews)
res.status(201).json(reviews)
    } catch(error){
        res.status(500).json({message: error.message})
    }
};

const fetchReviews = async(req,res) => {
    try{
        const {id} = req.params;
        const userId = req.user.id;
        const reviews = await reviewService.fetchReviews(id,userId);
        console.log('reviews',reviews)
        res.status(200).json(reviews);

    } catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {createReview, fetchReviews}