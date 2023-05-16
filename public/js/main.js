window.addEventListener('load', () => {
    const center = {
      lat: 38.711747960821725,
      lng:  -9.1372610664664,
    };
  
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: center
    });
  });
  
  
  async function getBeaches(){
    try{
      let response = await axios.get('/Beaches/api');
      placeRestaurants(response.data.restaurant);
    }
    catch(error){
      console.log(error);
    }
  }
  
  
  function placeRestaurants(restaurants){
    restaurants.forEach(restaurant => {
      const center = {
        lat: restaurant.location.coordinates[1],
        lng: restaurant.location.coordinates[0]
      }
  
    const pin = new google.maps.Marker({
      position: center, 
      map: map,
      title: restaurant.name
    })
    
    markers.push(pin);
  });
  }
  
  getRestaurants();
  
  
  const geocoder = new google.maps.Geocoder();
  
  document.getElementById('submit').addEventListener('click', () => {
    geocodeAddress(geocoder, map);
  });
  
  function geocodeAddress(geocoder, resultsMap) {
    const address = document.getElementById('address').value;
  
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        let marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
        document.getElementById('latitude').value = results[0].geometry.location.lat();
        document.getElementById('longitude').value = results[0].geometry.location.lng();
      } else {
        console.log(`Geocode was not successful for the following reason: ${status}`);
      }
    });
  }
  