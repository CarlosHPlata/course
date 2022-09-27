import { Pokemon } from "../dtos/pokemon.dto";

export const buildPokemon = async (): Promise<Pokemon> => {
  return Promise.resolve({} as unknown as Pokemon)
}