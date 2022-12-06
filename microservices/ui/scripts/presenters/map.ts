const music = new Audio('./resources/mapMusic.wav');
music.loop = true;
music.volume = 0.01;
let marker: google.maps.Marker;

export function addMarker(location: google.maps.LatLngLiteral, map: google.maps.Map) {
  if (marker) marker.setMap(null);
  marker = new google.maps.Marker({
    position: location,
    map: map,
  });
}

export function initMapMusic() {
  console.log('init')
  music.currentTime = 0;
  music.play();
}

export function stopMapMusic() {
  music.pause();
  music.currentTime = 0;
}