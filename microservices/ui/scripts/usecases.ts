import { travelInjections, tryCaptureInjections } from "./usecase";

const BASE_URL = import.meta.env.VITE_BASE_URL;
let encounter: any = null;

export const makeTravel =
  ({ map, markerPresenter, pokemonEncounter }: travelInjections) =>
  (lat: number, lng: number) => {
    fetch(`${BASE_URL}/traveler/travelto?lat=${lat}&long=${lng}`)
      .then((res) => res.json())
      .then((zoneContext) => {
        if (zoneContext.encounterOcurred) {
          encounter = zoneContext.encounter;
          var audio = new Audio('./resources/battle.wav');
          audio.volume = 0.2;
          pokemonEncounter(zoneContext.encounter);
        }

        markerPresenter({ lat, lng }, map);
      });
  };

export const makeTryCapture =
  ({
    captureInit,
    pokemonCaptured,
    pokemonEscaped,
  }: tryCaptureInjections) =>
  async ():Promise<boolean> => {
    if (encounter) {
      captureInit();
      const tryCapture: any = await capturePokemon();

      if (tryCapture.captured) {
        encounter.pcId = tryCapture.pcId;
        pokemonCaptured(encounter);
        return true;
      }

      pokemonEscaped(encounter);
    }

    return false
  };


export const makeGetPokemons = (showPokemons: (pokemons:any[]) => void) => (trainerId:number) => {
  fetch(`${BASE_URL}/trainer/${trainerId}/pokemon`)
  .then(r => r.json())
  .then(pokemons => showPokemons(pokemons))
}

const capturePokemon = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(callToCapturePookemon());
    }, 5000);
  });
};

const callToCapturePookemon = () => {
  return fetch(`${BASE_URL}/capturer/1/try`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(encounter),
  }).then((res) => res.json());
};
