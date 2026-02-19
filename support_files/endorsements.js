import {countries} from "./endorsement_entries.js";

let map;

async function initMap() {
    const center = { lat: 23, lng: 0 };
    //@ts-ignore
    const { Map,InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement,PinElement } = await google.maps.importLibrary("marker");

    // The map, centered at Uluru
    map = new Map(document.getElementById("map"), {
        zoom: 2,
        center: center,
        mapId: "JLG_Map",
    });

    const infoWindow = new InfoWindow();

    //create markers
    for(let country in countries){
        let countryEntry = countries[country];
        for (let endorsement in countryEntry.endorsements){
            let endorsementEntry = countryEntry.endorsements[endorsement];
            let quote = "";
            let author = "";
            for (let quoteLine in endorsementEntry.quote){
                quote+=endorsementEntry.quote[quoteLine];
            }

            for (let authorLine in endorsementEntry.author){
                author+=endorsementEntry.author[authorLine]+"\n";
            }
            let countryName = countries[country].country_name
            // const pin = new PinElement({
            //     glyph:`$countryName`,
            // });
            let coordinates = [];
            coordinates = endorsementEntry.coordinates;
            const position = {lat: coordinates[0], lng: coordinates[1]}

            const marker = new AdvancedMarkerElement({
                map: map,
                position: position,
                title: author+" : "+quote,
                // content: pin,
            });
            marker.addListener("click", ({ domEvent, latLng }) => {
                const { target } = domEvent;

                infoWindow.close();
                infoWindow.setContent(marker.title);
                infoWindow.open(marker.map, marker);
            });
        }
    }
}


initMap();