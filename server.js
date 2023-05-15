const app = require("./app");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

/*
const axios = require('axios');

app.get('/api/places', (req, res) => {
  const apiKey = AIzaSyBV7oX8COeBTmmOCO0a81qia-TW8lPGCOc;
  // Example request to the Places API
  const placeSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+New+York&key=${apiKey}`;

  axios.get(placeSearchUrl)
    .then(response => {
      // Process the response data and send it back to the client
      res.json(response.data);
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    });
});
*/