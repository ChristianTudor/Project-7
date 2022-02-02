import Restaurant from "./Restaurant.js";
import Restaurants from "./Restaurants_Oop.js";

const restaurants = new Restaurants()
const loader = new google.maps.plugins.loader.Loader({
  apiKey: "AIzaSyCwvAwHq_QnW9G7nmLRFIJkXRSPSRgvPt8",
  version: "weekly",
  libraries: ["places"],
});

//! Promise
loader
  .load()
  .then(() => {
    initMap();
  })
  .catch((e) => {});

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
  map.addListener("click", (event) => {
    let id = "add-restaurant-" + Date.now(); //! Add a unique ID to the form using Date.now()
    const addForm = restaurants.addForm(event.latLng.lat(), event.latLng.lng(), id);

	 //! Add an event listener to the button that extracts the data from the form
	 addForm.addEventListener("submit", (e) => {
		e.preventDefault()
    const addRestoForm = new FormData(addForm)
    const smallCardsContainer = document.getElementById("small-cards");
		const restaurantName = addRestoForm.get('restoName')
		const restaurantAddress = addRestoForm.get('restoAddress');
		const restaurantUrl = addRestoForm.get('restoWebsite');
		const restaurantTelephone = addRestoForm.get('restoTelephone');
		const restaurantRating = addRestoForm.get('restoRating')

		const restaurant = new Restaurant({
			name: restaurantName,
			address: restaurantAddress,
			url: restaurantUrl,
			phone: restaurantTelephone,
			rating: restaurantRating,
			lat: event.latLng.lat(),
			long: event.latLng.lng(),
			id: id
		  })
		  const smallCard = restaurant.createSmallCard();
		  smallCardsContainer.appendChild(smallCard);
		  restaurants.add(restaurant);
	  });

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
      },
      function () {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    //! Browser doesn't support Geolocation
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
		  console.log(results)
        restaurants.replace(results)
        for (var i = 0; i < results.length; i++) {
          const place = results[i];
		      if (
             place.rating >= minValue.selectedOptions[0].value &&
             place.rating <= maxValue.selectedOptions[0].value
           ){
        const restaurant = new Restaurant({  
				name: place.name,
				address: place.vicinity,
				rating: place.rating,
				lat: place.geometry.location.lat(),
				long: place.geometry.location.lng(),
				id: place.place_id,
				photo: place.photo,
				types: place.types,
				})
        
        const theMarker = createMarker(place.geometry.location, map, place.name);

        theMarker.addListener("click", () =>{
            let request = {
              placeId:place.place_id,
              fields: [
                "reviews",
                "opening_hours",
                "formatted_phone_number",
                "website",
              ],
            };

            service.getDetails(request, callback);
            
            function callback(placeResult) {
              const bigCardsContainer = document.getElementById("big-cards");
              smallCardsContainer.classList.add("d-none");
              bigCardsContainer.classList.remove("d-none");
              const openedHours = placeResult.opening_hours ? placeResult.opening_hours.weekday_text : [];
              const bigCard = restaurant.createBigCard({
                url: placeResult.website,
                phone: placeResult.formatted_phone_number,
                reviews: placeResult.reviews,
                openedHours: openedHours,
               
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
            
            function callback(placeResult) {
              console.log(placeResult)
              const bigCardsContainer = document.getElementById("big-cards");

              smallCardsContainer.classList.add("d-none");
              bigCardsContainer.classList.remove("d-none");

              const openedHours = placeResult.opening_hours ? placeResult.opening_hours.weekday_text : [];
              const bigCard = restaurant.createBigCard({
                url: placeResult.website,
                phone: placeResult.formatted_phone_number,
                reviews: placeResult.reviews,
                openedHours: openedHours,
             
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
