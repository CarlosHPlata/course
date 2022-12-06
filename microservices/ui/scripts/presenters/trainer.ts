// <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" class="trainer-pokemon-img">
// <div class="trainer-pokemon-info">
//   <div class="trainer-pokemon-name">
//     <h1 id="trainer-pokemon-name">char char</h1>
//     <span id="trainer-pokemon-specie">Charizard</span>
//   </div>
  
//   <div class="trainer-pokemon-info-stats">
//     <span class="types" id="trainer-pokemon-types"><span class="flying">flying</span></span>
//     <span class="moves-count" id="trainer-pokemon-moves-count">3</span>
//   </div>
// </div>

// <div class="trainer-pokemon">
            
//           </div>

export function presentPokemons(pokemons: any[]) {
  const list = document.getElementById('trainer-pokemons-list');
  if (list) list.innerHTML = "";
  pokemons.forEach((p) => presentPokemon(p, list))
}

function presentPokemon(pokemon: any, list:any) {
  const container = document.createElement('div');
  container.className = 'trainer-pokemon';

  container.appendChild( getImage(pokemon) );
  container.appendChild( getPokemonInfo(pokemon) );
  
  list?.appendChild(container);
}

function getImage({sprite}) {
  const pokemonImg = document.createElement('img');
  pokemonImg.className = 'trainer-pokemon-img';
  pokemonImg.src = sprite;

  return pokemonImg
}

function getPokemonInfo(pokemon) {
  const pokemonInfoContainer = document.createElement('div');
  pokemonInfoContainer.className = 'trainer-pokemon-info';

  pokemonInfoContainer.appendChild( getPokemonName(pokemon) );
  pokemonInfoContainer.appendChild( getPokemonStats(pokemon) );

  return pokemonInfoContainer;
}

function getPokemonName(pokemon) {
  const pokemonNameContainer = document.createElement('div');
  pokemonNameContainer.className = 'trainer-pokemon-name';

  const name = document.createElement('h1');
  name.innerText = pokemon.customName || pokemon.name;
  pokemonNameContainer.appendChild(name);

  if (pokemon.customName) {
    const specie = document.createElement('span');
    specie.innerText = pokemon.name;
    pokemonNameContainer.appendChild(specie);
  }

  return pokemonNameContainer;
}

function getPokemonStats(pokemon) {
  const container = document.createElement('div');
  container.className = 'trainer-pokemon-info-stats';

  const types = document.createElement('span');
  types.className = 'types';
  pokemon.types.forEach(t => {
    const span = document.createElement('span');
    span.innerHTML = t;
    span.className = t;
    types.appendChild(span);
  })

  const moves = document.createElement('span');
  moves.className = 'moves-count';
  moves.innerText = pokemon.moves.filter(m => m).length;

  container.appendChild(types);
  container.appendChild(moves);

  return container
}