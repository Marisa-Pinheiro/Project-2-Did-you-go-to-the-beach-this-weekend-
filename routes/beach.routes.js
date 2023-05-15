// Routes Configuration
const express = require("express");
const router = express.Router();

const axios = require("axios");

router.get("/beaches", (req, res) => {
  // Call the Google Maps Geocoding API with the search query
  axios
    .get("https://maps.googleapis.com/maps/api/place/textsearch/json", {
      params: {
        query: "beaches",
        key: process.env.API_KEY,
      },
    })
    .then((response) => {
      // Process the geocoding results here
      const results = response.data.results;
      console.log(results);

      // Pass into a view
      res.render("beaches/listofbeaches.hbs", { results });
      
    })
    .catch((error) => {
      console.error("Geocoding request failed:", error);
      res.status(500).json({ error: "Geocoding request failed" });
    });
});

// GET route to retrieve and display details of a specific beach
router.get('/listofbeaches/:beachId', (req,res)=>{
  // Destructuring the req.params.beachId
  const {beachId} = req.params; 

  // Feedback regarding to req.params.beachId
  //console.log('The Id from the URL is:', beachId);

  async function findBeachFromAPI(){
   try{
       // Finding the Beach via Id
       let foundBeach = await Beach.findById(beachId);
       // Feedback Regarding the found Beach
       // console.log(foundBeach;
       // Render 
       res.render('beaches/beachdetails.hbs', {beach: foundBeach});
   }
   catch(error){
       console.log(error);
   }
  }

  findBeachFromAPI();
})

module.exports = router;
