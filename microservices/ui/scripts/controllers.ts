
import { addMarker } from "./presenters/map";
import { makeGetPokemons, makeTravel, makeTryCapture } from "./usecases";
import { encounterEnd, pokemonEncounter } from "./presenters/encounter";
import { captureInit, pokemonCaptured, pokemonEscaped } from "./presenters/capture";
import { presentPokemons } from "./presenters/trainer";

export const initControllers = (map:google.maps.Map) => {

  google.maps.event.addListener(map, "click", (event) => {
    const lat = event.latLng.lat();
    const long = event.latLng.lng();

    console.log(lat, long);
    const travel = makeTravel({
      map,
      markerPresenter: addMarker,
      pokemonEncounter
    });

    travel(lat, long);
  });

  let closeButton = document.getElementById("encounter-flee");
  closeButton && closeButton.addEventListener("click", encounterEnd);

  let captureButton = document.getElementById("encounter-capture");
  captureButton && captureButton.addEventListener("click", () => {
    const tryCapture = makeTryCapture({ captureInit, pokemonCaptured, pokemonEscaped });
    tryCapture().then(r => r && showPokemons());
  });

  showPokemons();

} 

export const showPokemons = () => makeGetPokemons(presentPokemons)(1);

