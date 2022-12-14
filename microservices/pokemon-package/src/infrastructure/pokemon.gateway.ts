import { IPokemonGateway } from "../domain/interfaces/ipokemon.gateway";
import { mapToPokemonDto } from "./pokemon.mapper";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

export const pokemonGateway: IPokemonGateway = {
  getPokemonById: (id: number) => fetchPokeApi(id),
  getPokemonByName: (name: string) => fetchPokeApi(name),
};

const fetchPokeApi = async (namerOrId: string | number) => {
  try {
    const path = `${API_URL}${namerOrId}`;

    return await fetch(path)
      .then((res) => res.json())
      .then(mapToPokemonDto);
  } catch (e) {
    throw new Error("pokemon not found");
  }
};

