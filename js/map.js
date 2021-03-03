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
    const addForm = restaurant.addForm(event.latLng.lat(), event.latLng.lng());
    let infoWindow = new google.maps.InfoWindow({
      content: addForm,
    });
    const marker = createMarker(event.latLng, map, "");
    console.log(event.latLng.lat(), event.latLng.lng());
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
        requestRestaurants(pos);
      },
      function () {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    //! Browser doesn't support Geolocation
    requestRestaurants(pos);
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

  function requestRestaurants(pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent("Location found.");
    infoWindow.open(map);
    map.setCenter(pos);

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
          var place = results[i];
          //console.log(place);
          // console.log(place.geometry.location.lat());
          createMarker(place.geometry.location, map, place.name);

          const smallCard = restaurant.createSmallCard({
            name: place.name,
            address: place.vicinity,
            rating: place.rating,
            lat: place.geometry.location.lat(),
            long: place.geometry.location.lng(),
            id: place.place_id,
            photo: place.photo,
          });
          const smallCardsContainer = document.getElementById("small-cards");
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

            function callback(placeResult, placesServiceStatus) {
              console.log(placeResult)
              console.log(placesServiceStatus)
              const bigCardsContainer = document.getElementById("big-cards");

              smallCardsContainer.classList.add("d-none");
              bigCardsContainer.classList.remove("d-none");

              const openingHours = place.opening_hours ? place.opening_hours.weekday_text : [];

              const bigCard = restaurant.createBigCard({
                name: place.name,
                address: place.vicinity,
                url: place.url,
                phone: place.phone,
                reviews: place.reviews,
                lat: place.geometry.location.lat(),
                long: place.geometry.location.lng(),
                id: place.place_id,
                openedHours: openingHours,
                rating: place.rating,
                
                
                clickGoBack: () => {
                  smallCardsContainer.classList.add("d-none");
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

  //!add event drag for more resto in the area

  map.addListener("idle", function () {
    let moveForMore = {
      bounds: map.getBounds(),
      radius: 500,
      type: ["restaurant"],
    };

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(moveForMore, moreResto);

    function moreResto(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        restaurant.restaurants = results;
        // console.log(restaurant.restaurants);
        const minValue = document.getElementById("minValue");
        const maxValue = document.getElementById("maxValue");

        const restoContainer = document.getElementById("small-cards");
        restoContainer.innerHTML = "";
        restaurant.clearMarkers();
        for (var i = 0; i < results.length; i++) {
          var place = results[i];

          if (
            place.rating >= minValue.selectedOptions[0].value &&
            place.rating <= maxValue.selectedOptions[0].value
          ) {
            // console.log(place);
            const marker = createMarker(
              place.geometry.location,
              map,
              place.name
            );

            //! click on marker to show big card

            marker.addListener("click", () => {
              const theBig = document.getElementById("big-cards");
              const theSmall = document.getElementById("small-cards");
              restaurant.createBigCard({
                name: place.name,
                address: place.vicinity,
                rating: place.rating,
                lat: place.geometry.location.lat(),
                long: place.geometry.location.lng(),
                id: place.place_id,
                types: place.types,
              });
              theSmall.classList.add("d-none");
              theBig.classList.remove("d-none");
            });

            let photo;
            if (place.photos) {
              photo = place.photos[0].getUrl();
            }
            restaurant.createSmallCard({
              name: place.name,
              address: place.vicinity,
              rating: place.rating,
              lat: place.geometry.location.lat(),
              long: place.geometry.location.lng(),
              id: place.place_id,
              photo: photo,
            });
          }
        }
      }
    }
  });

  //!Fetch the resto.json file

  fetch("./resto.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const restoContainer = document.getElementById("resto-list");
      data.forEach((item) => {
        item.id = "resto-id" + Date.now();
        restaurant.createSmallCard({
          name: item.restaurantName,
          address: item.address,
          ratings: item.ratings,
          lat: item.lat,
          long: item.long,
          id: item.id,
          photo: item.photo,
        });
        var marker = new google.maps.Marker({
          position: {
            lat: item.lat,
            lng: item.long,
          },
          title: item.restaurantName,
          map: map,
        });
      });
    });
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
