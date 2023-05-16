// Routes Configuration
const express = require("express");
const router = express.Router();

//const axios = require("axios");
const Beach = require("../models/Beach.model");

// CRUD
// GET => render the form to create a new beach
router.get("/new", (req, res) => {
  res.render("beaches/new-beach.hbs");
});

// POST => to create new restaurant and save it to the DB
router.post("/new", (req, res) => {
  // add location object here
  const { longitude, latitude, rate, activity, name, description } = req.body;

  async function createBeach() {
    try {
      let newBeach = await Beach.create({
        name,
        description,
        rate,
        activity,
        location: {
          type: "Point",
          coordinate: [longitude, latitude],
        },
      });
      console.log(`${newBeach.name}`);
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

  /* Beach.findById(req.params.beach_id, (error, beach) => {
    if (error) {
      next(error);
    } else {
    }
  }); */
});

// POST => save updates in the database
router.post("/beaches/:beach_id/edit", async (req, res, next) => {
  const { beach_id } = req.params;
  const { name, description } = req.body;

  try {
    await Beach.findByIdAndUpdate(beach_id, { name, description });
    res.redirect(`/beaches`);
  } catch (error) {
    console.log(error);
  }

});

// DELETE => remove the restaurant from the DB
router.get("/beaches/:beach_id/delete", async (req, res, next) => {
  const { beach_id } = req.params;
  try {
    await Beach.findByIdAndRemove(beach_id);
    res.redirect("/beaches");
  } catch (error) {
    console.log(error);
  }

  /* Beach.remove({ _id: req.params.beach_id }, function(error, beach) {
          if (error) {
              next(error);
          } else {
          }
      }); */
});

/*
  // to see raw data in your browser, just go on: http://localhost:3000/api
  router.get('/api', (req, res, next) => {
      Restaurant.find({}, (error, allRestaurantsFromDB) => {
          if (error) { 
              next(error); 
          } else { 
              res.status(200).json({ restaurants: allRestaurantsFromDB });
          }
      });
  });
  
  // to see raw data in your browser, just go on: http://localhost:3000/api/someIdHere
  router.get('/api/:id', (req, res, next) => {
      let restaurantId = req.params.id;
      Restaurant.findOne({_id: restaurantId}, (error, oneRestaurantFromDB) => {
          if (error) { 
              next(error) 
          } else { 
              res.status(200).json({ restaurant: oneRestaurantFromDB }); 
          }
      });
  });
  
  // GET => get the details of one restaurant
  router.get('/:restaurant_id', (req, res, next) => {
      Restaurant.findById(req.params.restaurant_id, (error, restaurant) => {
          if (error) {
              next(error);
          } else {
              res.render('restaurants/show', { restaurant: restaurant });
          }
      });
  });

 */

module.exports = router;
