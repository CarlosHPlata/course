import { PokemonData } from '../dtos/pokemonInfo.dto'
import { pokemonGateway } from '../infrastructure/pokemonGateway'
import { IPokemonGateway } from '../interfaces/pokemonGateway'

export type FindOptions = { name?: string; id?: number }
export type GetPokemonFn = (opts: FindOptions) => Promise<PokemonData>

const makeGetPokemon =
  (gateway: IPokemonGateway): GetPokemonFn =>
  async ({ name, id }) => {
    if (id != null) {
      return gateway.getPokemonById(id)
    }
    if (name) {
      return gateway.getPokemonByName(name)
    }

    throw new Error('To get a pokemon we need a name or id')
  }

export default makeGetPokemon

export const getPokemon = makeGetPokemon(pokemonGateway) // we should remove this later
