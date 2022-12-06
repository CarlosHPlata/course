import { encounterEnd, setPokemonImage } from "./encounter";

const pokeballAudio = new Audio('./resources/pokemonEscape.wav');
const capturedAudio = new Audio('./resources/captured.wav');
const escapeAudio = new Audio('./resources/pokemonOut.wav');
escapeAudio.volume = 0.2;
pokeballAudio.loop = true;

export function captureInit() {
  pokeballAudio.play();
  setButtonsEnabled(false);
  showPokeball();
}

export function pokemonEscaped(pokemon) {
  pokeballAudio.pause();
  pokeballAudio.currentTime = 0;
  pokeballAudio.currentTime = 0;
  escapeAudio.play();
  setButtonsEnabled(true);
  setPokemonImage(pokemon);
}

export function pokemonCaptured() {
  pokeballAudio.pause();
  pokeballAudio.currentTime = 0;

  capturedAudio.currentTime = 0;
  capturedAudio.play();

  setPokeballCaptured();
  
  setTimeout(() => {
    setButtonsEnabled(true);
    encounterEnd();
  }, 2000);
}


function setButtonsEnabled(isEnable: boolean) {
  const fleeBtn = document.getElementById('encounter-flee');
  const captureBtn = document.getElementById('encounter-capture');
  console.log(captureBtn);

  if (isEnable) {
    captureBtn && captureBtn.removeAttribute('disabled');
    fleeBtn && fleeBtn.removeAttribute('disabled');
  } else {
    captureBtn && captureBtn.removeAttribute('disabled');
    fleeBtn && fleeBtn.setAttribute('disabled', 'true');
  }
}

const POKEBALL_CLASS = 'pokeball';
const POKEBALL_ID = 'capture-pokeball';
const POKEBALL_LOADING_CLASS = 'loading';
function showPokeball() {

  const img = document.createElement('img');
  img.src = './resources/pokeball.png';
  img.id = POKEBALL_ID;
  img.classList.add(POKEBALL_CLASS);
  img.classList.add(POKEBALL_LOADING_CLASS);

  const container = document.getElementById("encounter-image-container");
  if (container) {
    container.innerHTML = "";
    container.appendChild(img);
  }
}

function setPokeballCaptured() {
  const pokeball = document.getElementById(POKEBALL_ID);
  pokeball && pokeball.classList.remove(POKEBALL_LOADING_CLASS);
}