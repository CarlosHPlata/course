import { PokemonData } from "../dtos/pokemonInfo.dto";
import { pokemonGateway } from "../infrastructure/pokemonGateway";
import { IPokemonGateway } from "../interfaces/pokemonGateway";

export type FindOptions = { name?: string; id?: number };
export type getPokemonFn = (opts: FindOptions) => Promise<PokemonData>;

const makeGetPokemon =
  (pokemonGateway: IPokemonGateway): getPokemonFn =>
  async ({ name, id }) => {
    if (id != null) {
      return pokemonGateway.getPokemonById(id);
    } else if (name) {
      return pokemonGateway.getPokemonByName(name);
    }

    throw new Error("To get a pokemon we need a name or id");
  };

export default makeGetPokemon;

export const getPokemon = makeGetPokemon(pokemonGateway) //we should remove this later