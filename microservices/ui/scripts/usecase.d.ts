export type markerPresenter = (
  location: { lat: number; lng: number },
  map: any
) => void;

export type pokemonEncounter = (pokemon) => void;
export type travelInjections = {
  map: any
  markerPresenter: markerPresenter,
  pokemonEncounter: pokemonEncounter
}

export type tryCaptureInjections = {
  captureInit: () => void,
  pokemonCaptured: (pokemon) => void,
  pokemonEscaped: (pokemon) => void,
}