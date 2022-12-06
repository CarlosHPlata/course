import { PokemonData } from "../dtos";
import { IPokemonGateway } from "../interfaces/ipokemon.gateway";
import { FindOptions } from "./input.dtos";

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
