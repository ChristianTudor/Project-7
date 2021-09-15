//const Restaurants = require("Restaurants");

import Restaurants from "./Restaurants copy.js";
const restaurant = new Restaurants();
const loader = new google.maps.plugins.loader.Loader({
  apiKey: "AIzaSyCwvAwHq_QnW9G7nmLRFIJkXRSPSRgvPt8",
  version: "weekly",
  libraries: ["places"],
});

// Promise
loader
  .load()
  .then(() => {
    initMap();
  })
  .catch((e) => {
    // do something
  });

function initMap() {
  const options = {
    zoom: 15,
    center: {
      lat: 48.8737815,
      lng: 2.3501649,
    },
  };
  let map = new google.maps.Map(document.getElementById("map"), options);

  //! add an event listener to the map

  //right click
  map.addListener("click", (event) => {
    let id = "add-restaurant-" + Date.now(); //! Add a unique ID to the form using Date.now()

    const addForm = restaurant.addForm(event.latLng.lat(), event.latLng.lng(), id);
    let infoWindow = new google.maps.InfoWindow({
      content: addForm,
    });
    const marker = createMarker(event.latLng, map, "");
    infoWindow.open(map, marker);
  });

  //!geolocation

  let infoWindow;
  infoWindow = new google.maps.InfoWindow();
  let pos = {
    lat: 0,
    lng: 0,
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(pos);
        //requestRestaurants(pos);
      },
      function () {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    //! Browser doesn't support Geolocation
    //requestRestaurants(pos);
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }

  const minValue = document.getElementById("minValue");
  const maxValue = document.getElementById("maxValue");

  minValue.addEventListener("change", () =>{
    let pos = {
      lat: map.getCenter().lat(),
      lng: map.getCenter().lng()
    }
    requestRestaurants(pos)
  })
  
  maxValue.addEventListener("change", ()=>{
    let pos = {
      lat: map.getCenter().lat(),
      lng: map.getCenter().lng()
    }
    requestRestaurants(pos)
  })
  
  function requestRestaurants(pos) {

    const minValue = document.getElementById("minValue");
    const maxValue = document.getElementById("maxValue");

    

    
    infoWindow.setPosition(pos);
    infoWindow.setContent("Location found.");
    infoWindow.open(map);
    
    const smallCardsContainer = document.getElementById("small-cards");
    smallCardsContainer.innerHTML = "";
    
    //! Get results from google places

    let request = {
      location: pos,
      radius: 500,
      type: ["restaurant"],
    };
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        restaurant.restaurants = results;

        for (var i = 0; i < results.length; i++) {
          const place = results[i];

            if (
             place.rating >= minValue.selectedOptions[0].value &&
             place.rating <= maxValue.selectedOptions[0].value
           ){
             
          //console.log(place);
          // console.log(place.geometry.location.lat());
          const theMarker = createMarker(place.geometry.location, map, place.name);
          theMarker.addListener("click", () =>{
            let request = {
              placeId:place.place_id,
              fields: [
                "name",
                "rating",
                "reviews",
                "opening_hours",
                "types",
                "formatted_address",
                "formatted_phone_number",
                "website",
              ],
            };

            service.getDetails(request, callback);
            // replace place with placeResult
            function callback(placeResult, placesServiceStatus) {
              console.log(placeResult)
              
              const bigCardsContainer = document.getElementById("big-cards");

              smallCardsContainer.classList.add("d-none");
              bigCardsContainer.classList.remove("d-none");

              const openedHours = placeResult.opening_hours ? placeResult.opening_hours.weekday_text : [];
              const bigCard = restaurant.createBigCard({
                name: placeResult.name,
                address: placeResult.formatted_address,
                url: placeResult.website,
                phone: placeResult.formatted_phone_number,
                reviews: placeResult.reviews,
                lat: position.lat,
                long: position.long,
                id: place.place_id,
                openedHours: openedHours,
                rating: placeResult.rating,
                
                
                clickGoBack: () => {
                  smallCardsContainer.classList.remove("d-none");
                  bigCardsContainer.classList.add("d-none");
                  bigCardsContainer.innerHTML = "";
                },
              });

              bigCardsContainer.appendChild(bigCard);
            }
            
          })
          
          const position = {
            lat: place.geometry.location.lat(),
            long: place.geometry.location.lng()
          }
          const smallCard = restaurant.createSmallCard({
            name: place.name,
            address: place.vicinity,
            rating: place.rating,
            lat: position.lat,
            long: position.long,
            id: place.place_id,
            photo: place.photo,
          });
          // console.log(smallCard)
          
          smallCardsContainer.appendChild(smallCard);
          
          smallCard.addEventListener("click", () => {
            let request = {
              placeId:place.place_id,
              fields: [
                "name",
                "rating",
                "reviews",
                "opening_hours",
                "types",
                "formatted_address",
                "formatted_phone_number",
                "website",
              ],
            };

            service.getDetails(request, callback);
            // replace place with placeResult
            function callback(placeResult, placesServiceStatus) {
              console.log(placeResult)
              
              const bigCardsContainer = document.getElementById("big-cards");

              smallCardsContainer.classList.add("d-none");
              bigCardsContainer.classList.remove("d-none");

              const openedHours = placeResult.opening_hours ? placeResult.opening_hours.weekday_text : [];
              const bigCard = restaurant.createBigCard({
                name: placeResult.name,
                address: placeResult.formatted_address,
                url: placeResult.website,
                phone: placeResult.formatted_phone_number,
                reviews: placeResult.reviews,
                lat: position.lat,
                long: position.long,
                id: place.place_id,
                openedHours: openedHours,
                rating: placeResult.rating,
                
                
                clickGoBack: () => {
                  smallCardsContainer.classList.remove("d-none");
                  bigCardsContainer.classList.add("d-none");
                  bigCardsContainer.innerHTML = "";
                },
              });

              bigCardsContainer.appendChild(bigCard);
            }
          });
        }
      }
      }
    }
  }

  //!add event drag for more resto in the area

  map.addListener("idle", function () {
    let pos = {
      lat: map.getCenter().lat(),
      lng: map.getCenter().lng()
      
    }
    requestRestaurants(pos)

    // let moveForMore = {
    //   bounds: map.getBounds(),
    //   radius: 500,
    //   type: ["restaurant"],
    // };

  //   const service = new google.maps.places.PlacesService(map);
  //   service.nearbySearch(moveForMore, moreResto);

  //   function moreResto(results, status) {
  //     if (status == google.maps.places.PlacesServiceStatus.OK) {
  //       restaurant.restaurants = results;
  //       // console.log(restaurant.restaurants);
  //       const minValue = document.getElementById("minValue");
  //       const maxValue = document.getElementById("maxValue");

  //       const restoContainer = document.getElementById("small-cards");
  //       restoContainer.innerHTML = "";
  //       restaurant.clearMarkers();
  //       for (var i = 0; i < results.length; i++) {
  //         var place = results[i];

  //         if (
  //           place.rating >= minValue.selectedOptions[0].value &&
  //           place.rating <= maxValue.selectedOptions[0].value
  //         ) {
  //           // console.log(place);
  //           const marker = createMarker(
  //             place.geometry.location,
  //             map,
  //             place.name
  //           );

  //           //! click on marker to show big card
  //           const theSmall = document.getElementById("small-cards");
  //           marker.addListener("click", () => {
  //             const theBig = document.getElementById("big-cards");
  //             const bigCard = restaurant.createBigCard({
  //               name: place.name,
  //               address: place.vicinity,
  //               rating: place.rating,
  //               lat: place.geometry.location.lat(),
  //               long: place.geometry.location.lng(),
  //               id: place.place_id,
  //               types: place.types,
  //             });
  //             theBig.appendChild(bigCard)
  //             theSmall.classList.add("d-none");
  //             theBig.classList.remove("d-none");
  //           });

  //           let photo;
  //           if (place.photos) {
  //             photo = place.photos[0].getUrl();
  //           }
  //           const smallCard = restaurant.createSmallCard({
  //             name: place.name,
  //             address: place.vicinity,
  //             rating: place.rating,
  //             lat: place.geometry.location.lat(),
  //             long: place.geometry.location.lng(),
  //             id: place.place_id,
  //             photo: photo,
  //           });
  //           theSmall.appendChild(smallCard)
  //         }
  //       }
  //     }
  //   }
  });

  //!Fetch the resto.json file

  // fetch("./resto.json")
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     const restoContainer = document.getElementById("resto-list");
  //     data.forEach((item) => {
  //       item.id = "resto-id" + Date.now();
  //       restaurant.createSmallCard({
  //         name: item.restaurantName,
  //         address: item.address,
  //         ratings: item.ratings,
  //         lat: item.lat,
  //         long: item.long,
  //         id: item.id,
  //         photo: item.photo,
  //       });
  //       var marker = new google.maps.Marker({
  //         position: {
  //           lat: item.lat,
  //           lng: item.long,
  //         },
  //         title: item.restaurantName,
  //         map: map,
  //       });
  //     });
  //   });
}

//!add a location on the map by creating a new marker and add info window to the new marker

function createMarker(location, map, title) {
  let newMarker = new google.maps.Marker({
    position: location,
    map: map,
    title: title,
  });
  return newMarker;
}
