const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
    {
  placeId: String,
  author: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
  content: String,
})

const Review = model("Review", reviewSchema);

module.exports = Review;
