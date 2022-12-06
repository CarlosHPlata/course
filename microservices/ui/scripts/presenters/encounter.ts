import { initMapMusic, stopMapMusic } from "./map";

const battleAudio = new Audio('./resources/battle.wav');
battleAudio.volume = 0.01;

export function pokemonEncounter(pokemon) {
  setPokemonImage(pokemon);
  setPokemonInfo(pokemon);
  setPokemonStats(pokemon);
  setPokemonMoves(pokemon);

  stopMapMusic()
  battleAudio.play()
  toggleModal();

}

const ENCOUNTER_IMG_CLASS = 'pokemon-sprite';
export function setPokemonImage ({sprite}) {
  const img = document.createElement('img');
  img.src = sprite;
  img.className = ENCOUNTER_IMG_CLASS;
  const container = document.getElementById("encounter-image-container");
  if (container) {
    container.innerHTML = "";
    container.appendChild(img);
  }
}

export function encounterEnd() {
  battleAudio.pause();
  battleAudio.currentTime = 0;
  initMapMusic();
  toggleModal();
}


function setPokemonInfo (pokemon) {
  const nameEl = document.getElementById("encounter-name");
  const pokedexNoEl = document.getElementById("encounter-pokedex-no");
  const genderEl = document.getElementById("encounter-gender");
  const typesEl = document.getElementById("encounter-types");

  if (nameEl) nameEl.innerHTML = pokemon.name;
  if (pokedexNoEl) pokedexNoEl.innerHTML = pokemon.pokedexNumber;
  if (genderEl) genderEl.innerHTML = pokemon.gender;
  if (typesEl) {
    typesEl.innerHTML = "";
    pokemon.types.forEach(t => {
      const span = document.createElement('span');
      span.innerHTML = t;
      span.className = t;
      typesEl.appendChild(span);
    })
  }

}

function setPokemonStats({ stats }) {
  const hp = document.getElementById("encounter-hp");
  const hpevs = document.getElementById("encounter-hp-ev");
  
  const attack = document.getElementById("encounter-attack");
  const attackevs = document.getElementById("encounter-attack-ev");
  
  const defense = document.getElementById("encounter-defense");
  const defenseevs = document.getElementById("encounter-defense-ev");
  
  const speed = document.getElementById("encounter-speed");
  const speedevs = document.getElementById("encounter-speed-ev");
  
  const specialAttack = document.getElementById("encounter-special-attack");
  const specialAttackevs = document.getElementById("encounter-special-attack-ev");
  
  const specialDefense = document.getElementById("encounter-special-defense");
  const specialDefenseevs = document.getElementById("encounter-special-defense-ev");

  if(hp && hpevs) {
    hp.innerHTML = stats.hp.base;
    hpevs.innerHTML = stats.hp.maxEvs;
  }

  if(defense && defenseevs) {
    defense.innerHTML = stats.defense.base;
    defenseevs.innerHTML = stats.defense.maxEvs;
  }

  if(attack && attackevs) {
    attack.innerHTML = stats.attack.base;
    attackevs.innerHTML = stats.attack.maxEvs;
  }

  if(speed && speedevs) {
    speed.innerHTML = stats.speed.base;
    speedevs.innerHTML = stats.speed.maxEvs;
  }

  if(specialAttack && specialAttackevs) {
    specialAttack.innerHTML = stats.specialAttack.base;
    specialAttackevs.innerHTML = stats.specialAttack.maxEvs;
  }

  if(specialDefense && specialDefenseevs) {
    specialDefense.innerHTML = stats.specialDefense.base;
    specialDefenseevs.innerHTML = stats.specialDefense.maxEvs
  }
}

const MOVE_CLASS = 'move';
function setPokemonMoves({moves}) {
  const movesContainer = document.getElementById('encounter-moves');
  if (movesContainer) {
    movesContainer.innerHTML = "";
    moves.filter(m => m).forEach(move => {
      const moveEl = document.createElement('span');
      moveEl.innerHTML = move.name;
      moveEl.className = MOVE_CLASS
      movesContainer.appendChild(moveEl)
    });
  }
  
}

export function toggleModal() {
  const modal = document.querySelector(".modal");
  const isModalOpen: boolean = !!modal?.classList.contains('show-modal');

  modal && modal.classList.toggle("show-modal");
  const modalBox = document.querySelector(".modal-box");
  const animation = document.getElementById("encounter-load-animation");


  if (isModalOpen) {
    modalBox && modalBox.classList.toggle("show");
    return;
  }

  setTimeout(() => {
    animation && animation.classList.toggle("show");
  }, 1000);
  setTimeout(() => {
    animation && animation.classList.toggle("show");
    modalBox && modalBox.classList.toggle("show");
  }, 3000);
}