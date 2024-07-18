const coordinates = [-122.30765631617852,47.6545713858705]
const zoomRange = 5

let myObject = {"someField": "someValue", "someOtherField":12}

let initConditions= {"zoomRange": 11, "mapCenter": [-122.30765631617852,47.6545713858705]}

let startingPoint ={
    "coordinates": [-122.30765631617852,47.6545713858705],
    "zoomLevel":5 
}
// Initialize the map
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/5ef39cfc-d113-44d5-8639-c51385b0b115/style.json?key=uqJNwQO9lP1VKm74Hia6',
    center: startingPoint.coordinates,
    zoom: startingPoint.zoomLevel
});

function addMarker(lat,lng,title,message){
    let popup_message = `<h2>${title}</h2> <h3>${message}</h3>`
    new maplibregl.Marker()
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup()
            .setHTML(popup_message))
        .addTo(map)
    createButtons(lat,lng,title);
    return message
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title; 
    newButton.innerHTML = title; 
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng); 
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat],
        })


    })
    document.getElementById("contents").appendChild(newButton);

}

function processData(results){
    // console.log(results)
    results.features.forEach(result => {
    console.log(result)
    addMarker(result.geometry.coordinates[1],result.geometry[0]) 
})
}


map.on('load', function() {
    console.log("HEY LOOK! THE MAP HAS LOADED!")
    fetch("map.geojson")
    .then(response=> 
        {
        return results.json
    })
    .then(response=>{
        processData(response)
    });
});
// const sampleDataArray = [[33.97,-118.417,'LMU','Where I attended my third and final year of undergrad'],[47.655, -122.308, 'University of Washington','Where attended my freshman and sophomore years of college'],[35.657, 140.044,'KUIS','Where I attended my study abroad in Spring of my sophomore year'],[34.022,-118.285,'USC','Where I will attend my masters in Fall 2024'],[34.042, -118.264,'UCLA','This is where I am attending summer classes!']]

// for (let i = 0; i < sampleDataArray.length; i++){
// console.log (i)
// }

const sampleDataArray = [[33.97,-118.417,'LMU','Where I attended my third and final year of undergrad'],[47.655, -122.308,'University of Washington','Where attended my freshman and sophomore years of college'],[35.657, 140.044,'KUIS','Where I attended my study abroad in Spring of my sophomore year'],[34.022,-118.285,'USC','Where I will attend my masters in Fall 2024'],[34.042, -118.264,'UCLA','This is where I am attending summer classes!']]

    for (let i = 0; i< sampleDataArray.length; i++)
{
addMarker(sampleDataArray[i][0],sampleDataArray[i][1], 
    sampleDataArray[i][2],sampleDataArray[i][3]) 
}
