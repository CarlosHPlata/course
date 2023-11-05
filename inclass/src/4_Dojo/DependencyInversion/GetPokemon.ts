import PokemonStore from "./PokemonStore";

const getPokemon = async ({ id }) => {
  const pokemon = await PokemonStore.getPokemonById(id);

  return {
    ...pokemon,
    attack: calculatePokemonRate(pokemon.attack),
    defense: calculatePokemonRate(pokemon.defense),
  }
}

const calculatePokemonRate = async (attack: number) => {
  const rnd = Math.random() * 10;
  return attack * rnd
}