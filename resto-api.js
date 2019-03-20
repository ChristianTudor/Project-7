function initMap() {
    let options = {
        zoom: 10,
        center: {
            lat: -34.397,
            lng: 150.644
        }

    }
    let map = new google.maps.Map(document.getElementById("map"), options)

    var marker = new google.maps.marker({
        position: {
            lat: -34.397,
            lng: 150.644
        },
        map: map

    });
}