// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets/style.json?key=uGrhAmUTOWlWMJBYmLzj', // Your style URL
    center: [ -118.443, 33.992], // Starting position [lng, lat]
    zoom: 9// Starting zoom level
});

// Add a marker to the map
new maplibregl.Marker()
    .setLngLat([ -118.443, 33.992])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('Inosanto Academy of Martial Arts- <br>this is my childhood training facility '))
    .addTo(map);

let longitude = -118.443481;
let latitude = 34.070391;

// Add a marker to the map
const marker = new maplibregl.Marker()
    .setLngLat([-118.535, 34.286])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
    .setHTML('JAM- <tags> this is my current stunt training facility </tags>'))
    .addTo(map);


