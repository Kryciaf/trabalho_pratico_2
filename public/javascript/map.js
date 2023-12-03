import { fetchMap } from "./api.js";

const centralLatLong = [-73.9352, 40.7004]

mapboxgl.accessToken = 'pk.eyJ1Ijoicm9tbWVsY2FybmVpcm8tcHVjIiwiYSI6ImNsb3ZuMTBoejBsd2gyamwzeDZzcWl5b3oifQ.VPWc3qoyon8Z_-URfKpvKg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: centralLatLong,
    zoom: 7
});

const initializeMap = async () => {
    const data = await fetchMap();

    data.forEach((uni) => {
        const { location, name } = uni;

        const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
                    <h6>
                        <a href="album.html?breed=${name}">${name}</a>
                    </h6>
                    
                    <br>
                        ${location.address}
                    <br>
                        ${location.city}`
                    );
    
    new mapboxgl.Marker({ color: location.color })
            .setLngLat(location.latlong)
            .setPopup(popup)
            .addTo(map);     
    }) 
    
}

document.addEventListener("DOMContentLoaded", async function () {
    initializeMap()
});