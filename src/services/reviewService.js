const Review = require("../models/Reviews");

const createReview = async(reviewData) => {
    try{
const review = await Review.create(reviewData);
return review;
    } catch(error){
        throw error
    }
};

const fetchReviews = async(taskId,userId) => {
    try{
const reviews = await Review.find({_id: taskId, userId: userId});
return reviews
        
    } catch(error){
        throw error
    }
}

module.exports = {createReview, fetchReviews}