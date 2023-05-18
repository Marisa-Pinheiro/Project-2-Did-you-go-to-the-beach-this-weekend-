const { Schema, model } = require("mongoose");

const beachSchema = new Schema(
  {
    name: String,
    description: String,
    imageUrl: String,
    gallery: [String],
    rating: Number,
    activity: String,
    //directionsUrl: String,
    location: { type: { type: String }, coordinate: [Number] },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Beach = model("Beach", beachSchema);

module.exports = Beach;
