// declare variables
let mapOptions = {'centerLngLat': [-118.444,34.0709],'startingZoomLevel':10}

const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/5ef39cfc-d113-44d5-8639-c51385b0b115/style.json?key=uqJNwQO9lP1VKm74Hia6',
    center: mapOptions.centerLngLat,
    zoom: mapOptions.startingZoomLevel
});

function addMarker(feature){
    console.log(feature)
    let longitude = feature.lng;
    let latitude = feature.lat;
    let seenMovie = feature["Have you seen Inside Out 2?"];
    let theater = feature["Where did you watch the movie?"];
    let zipcode = feature["What is your zipcode?"];
    let markerColor;
    if (seenMovie == "yes"){
         popup_message = `<h2>Someone with taste!</h2> 
         <h3>${theater}</h3>`
         createButtons(latitude,longitude,theater,seenMovie); 
         markerColor= "pink"
    }
    else{
        popup_message = `<h2>Someone who needs to go watch the movie</h2><p>Zip Code: ${zipcode}</p>`
        createButtons(latitude,longitude,zipcode,seenMovie); 
        // REMEMBER THIS FOR FINAL
        markerColor= "gray"
    }
    new maplibregl.Marker(
            {color: markerColor}
        )  
        .setLngLat([longitude, latitude])
        .setPopup(new maplibregl.Popup()
            .setHTML(popup_message))
        .addTo(map)
    return theater;
}
function kaila(){

}
function createButtons(lat,lng,buttonText,seen){
    const newButton = document.createElement("button");
    newButton.id = "button"+buttonText;
    if (seen == "yes"){
        //newButton.style.setProperty("background-color","green")
        //newButton.style.setProperty("color","white")
        newButton.className = "yesButton"

    }
    else{
        newButton.className = "noButton"
    }
    newButton.innerHTML = buttonText;
    newButton.setAttribute("lat",lat);
    newButton.setAttribute("lng",lng);
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat],
        })
    })
    document.getElementById("contents").appendChild(newButton);
}

const myData = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTOkMCfDr8qurUTTgVRaUrFMIKiDOXr1yNpHBXpHJhtM6Gq7szAx5iBaenUdhdbh-tFZHjxZYy2sX1l/pub?output=csv"
map.on('load', function() {
    // Use PapaParse to fetch and parse the CSV data from a Google Forms spreadsheet URL
     Papa.parse(myData, {
        download: true, // Tells PapaParse to fetch the CSV data from the URL
        header: true, // Assumes the first row of your CSV are column headers
        complete: results=> {
            console.log(results.data)
            processData(results.data)
         }
    });
});

function processData(results){
    console.log(results) //for debugging: this can help us see if the results are what we want
    results.forEach(feature => {
        // for debugging: are we seeing each feature correctly?
        // assumes your geojson has a "title" and "message" attribute
        addMarker(feature);
        //let message = feature[ "How was your experience watching the movie?"]
        //addMarker(latitude,longitude,title,message);
    });
};
