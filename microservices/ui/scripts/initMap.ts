import { initMapMusic } from "./presenters/map";

export const initGMaps = () => {
  const bangalore = { lat: 51.47806425318855, lng: 0.2517990695845862 };

  const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    zoom: 5,
    center: bangalore,
  });

  initMapMusic();

  return map;
}