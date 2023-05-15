const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
    {
  placeId: String,
  author: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
  content: String,
  pictures: [String]
})

const Review = model("Review", userSchema);

module.exports = Review;
