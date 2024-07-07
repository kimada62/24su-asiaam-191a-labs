// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: [-118.264,34.042], // Starting position [lng, lat]
    zoom: 10 // Starting zoom level
});


function addMarker(latitude,longitude,title,message){ 
new maplibregl.Marker() 
        .setLngLat([longitude, latitude]) 
        .setPopup(new maplibregl.Popup()
            .setHTML(`<h2>${title}</h2> <h3>${message}</h3>`))
        .addTo(map) 
    createButtons(latitude,longitude,title)
};

function createButtons(latitude,longitude,title){

        const newButton = document.createElement("button"); 
        newButton.className = "customButtons"
        newButton.id = "button"+title; 
        newButton.innerHTML = title; 
        newButton.setAttribute("lat",latitude); 
        newButton.setAttribute("lng",longitude); 
        newButton.addEventListener('click', function(){
            map.flyTo({
                center: [longitude,latitude], 
            })
        })
        document.getElementById("contents").appendChild(newButton); 
    }


addMarker(33.992,-118.443, "Inosanto Academy","this is my childhood martial arts facility")
addMarker(34.286,-118.535, "JAM","this is where I train stunts")
addMarker(34.042,-118.264, "Yates Gym","this is where I train with UCLA wushu")