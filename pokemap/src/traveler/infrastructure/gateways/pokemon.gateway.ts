import { createPokemon, Pokemon } from "../../../pokemon";
import { getBaseData, getPokemonMoves, getPokemonStats } from "../../domain/useCases/pokemon.usecase";
import IPokemonGateway from "../../domain/interfaces/pokemon.gateway";

export const pokemonGateway: IPokemonGateway = {
  generatePokemon: function (id: number): Promise<Pokemon> {
    return createPokemon({id}, {
      getBaseData,
      getPokemonMoves,
      getPokemonStats,
    })
  }
}