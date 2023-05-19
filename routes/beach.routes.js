// Routes Configuration
const express = require("express");
const router = express.Router();

// Require Beach Model
const Beach = require("../models/Beach.model");
// Require User Model
const User = require("../models/User.model.js");
// Require Review Model
const Review = require("../models/Review.model.js");

// Require fileUploader
const fileUploader = require("../config/cloudinary.config");

// CRUD
// GET => render the form to create a new beach
router.get("/new", (req, res) => {
  res.render("beaches/new-beach.hbs");
});

// POST => to create new Beach and save it to the DB
router.post("/new", fileUploader.single("beach-image"), (req, res) => {
  const { name, description, rate, activity, longitude, latitude } = req.body;

  async function createBeach() {
    try {
      //const currentUser = req.session.currentUser._id;
      await Beach.create({
        name,
        description,
        rate,
        activity,
        location: {
          type: "Point",
          coordinate: [longitude, latitude],
        },
        imageUrl: req.file.path,
      });
      res.redirect("/beaches");
    } catch (error) {
      console.log(error);
    }
  }
  createBeach();
});

// GET => to retrieve all the beaches from the DB
router.get("/beaches", (req, res, next) => {
  async function findAllBeaches() {
    try {
      let allBeaches = await Beach.find();
      //console.log('here');
      res.render("beaches/list-beaches.hbs", { beaches: allBeaches });
    } catch (error) {
      console.log(error);
    }
  }
  findAllBeaches();
});

// GET => get the form pre-filled with the details of one beach
router.get("/beaches/:beach_id/edit", async (req, res) => {
  const { beach_id } = req.params;
  try {
    const beach = await Beach.findById(beach_id);

    res.render("beaches/update-beach.hbs", { beach });
  } catch (error) {
    console.log(error);
  }
});

// POST => save updates in the database
router.post(
  "/beaches/:beach_id/edit",
  fileUploader.single("beach-image"),
  async (req, res, next) => {
    const { beach_id } = req.params;
    const { name, description, existingImage } = req.body;

    let imageUrl;

    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = existingImage;
    }

    try {
      await Beach.findByIdAndUpdate(beach_id, { name, description, imageUrl });
      res.redirect(`/beaches`);
    } catch (error) {
      console.log(error);
    }
  }
);

// DELETE => remove the beach from the DB
router.get("/beaches/:beach_id/delete", async (req, res) => {
  const { beach_id } = req.params;
  try {
    await Beach.findByIdAndRemove(beach_id);
    res.redirect("/beaches");
  } catch (error) {
    console.log(error);
  }
});

// GET route to retrieve and display details of a specific Beach
router.get("/beaches/:beach_id", (req, res) => {
  const { beach_id } = req.params;

  async function findBeachFromDb() {
    try {
      // Find all the users
      const users = await User.find();
      // Finding the Beach via Id
      let foundBeach = await Beach.findById(beach_id).populate({
        path: "reviews",
        populate: {
          path: "author",
          model: "User",
        },
      });
      res.render("beaches/beach-details.hbs", { beach: foundBeach, users });
    } catch (error) {
      console.log(error);
    }
  }

  findBeachFromDb();
});

router.post("/review/create/:beach_id", (req, res) => {
  const { beach_id } = req.params;
  const { content, author } = req.body;

  async function createReviewinDb() {
    try {
      // Create the Review
      const newReview = await Review.create({
        content,
        author: req.session.currentUser,
      });

      // Add the Review to the Beach
      const beachUpdate = await Beach.findByIdAndUpdate(
        beach_id,
        { $push: { reviews: newReview._id } },
        { new: true } // Add { new: true } to return the updated document
      );

      // Add the Review to the User
      const userUpdate = await User.findByIdAndUpdate(req.session.currentUser, {
        $push: { reviews: newReview._id },
      });

      res.redirect(`/beaches/${beach_id}`);
    } catch (error) {
      console.log(error);
    }
  }
  createReviewinDb();
});

// DELETE review
router.post("/review/delete/:review_id/:beachId", (req, res) => {
  const { review_id, beachId } = req.params;

  async function deleteReviewInDb() {
    try {
      const removedReview = await Review.findByIdAndRemove(review_id);

      await User.findByIdAndUpdate(removedReview.author, {
        $pull: { reviews: review_id },
      });

      await Beach.findByIdAndUpdate(beachId, {
        $pull: { reviews: review_id },
      });

      res.redirect(`/beaches/${beachId}`);
    } catch (error) {
      console.log(error);
    }
  }

  deleteReviewInDb();
});

// GET route to display a form to Add Image to Beach
router.get("/beaches/:beachId/addimage", async (req, res) => {
  const { beachId } = req.params;
  try {
    const beach = await Beach.findById(beachId);
    res.render("beaches/new-img-beach.hbs", { beach });
  } catch (error) {
    console.log(error);
  }
});

// POST Route to save the new Image to Beach data
router.post(
  "/beaches/:beachId/addimage",
  fileUploader.single("new-beach-image"),
  async (req, res) => {
    const { beachId } = req.params;

    let image;
    image = req.file.path;

    try {
      await Beach.findByIdAndUpdate(
        beachId,
        { $push: { gallery: image } },
        { new: true }
      );
      res.redirect(`/beaches/${beachId}`);
    } catch (error) {
      console.log(error);
    }
  }
);

//ADD TO FAVS
router.post("/beaches/:beachId/addFavs", async (req, res, next) => {
  const { beachId } = req.params;
  const userProfile = req.session.currentUser._id;

  try {
    const addedBeach = await Beach.findById(beachId);
    const user = await User.findById(userProfile);

    user.favorites.push(addedBeach._id);

    await user.save();

    res.redirect("/userprofile");
  } catch (error) {
    console.log(error);
    next(error);
  }
});


module.exports = router;
