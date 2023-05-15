const { Schema, model } = require("mongoose");

const beachSchema = new Schema(
{
    name: String, 
    description: String, 
    imageUrl: String,
    rating: Number,
    directionsUrl: String,
    reviews: [{
    type: Schema.Types.ObjectId, 
    ref: 'Review'
 }]
},
{
    timestamps: true
})

const Beach = model("Beach", userSchema);

module.exports = Beach;

