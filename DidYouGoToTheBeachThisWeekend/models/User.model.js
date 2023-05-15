const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/^\S+@\S+.\S+$/, 'Please use a valid email address' ],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
  favorites: [{
         type: Schema.Types.ObjectId,
         ref: 'Beach'
         }],
  
  reviews: [{
         type: Schema.Types.ObjectId,
         ref: 'Review'
         }]
        }, 
  {
    timestamps: true
}
);

const User = model("User", userSchema);

module.exports = User;
