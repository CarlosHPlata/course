import { pokemonMock } from '@test/pokemon/mocks/pokemon.mock'
import { Gender } from '../dtos/metadata'
import { Pokemon, PokemonMoves } from '../dtos/pokemon.dto'
import { PokemonData } from '../dtos/pokemonInfo.dto'
import { buildPokemon, PokemonBuilder } from './buildPokemon'

const moves: PokemonMoves = [
  pokemonMock.moves[0],
  pokemonMock.moves[1],
  pokemonMock.moves[2],
  pokemonMock.moves[3],
]

const baseInfo = {
  customName: 'test',
  gender: Gender.MALE,
  isShiny: false,
}

const { id } = pokemonMock

const pokemonBuilder: PokemonBuilder = {
  buildBaseData: () => Promise.resolve(baseInfo),
  buildMoves: () => Promise.resolve(moves),
  buildStats: (stats) => Promise.resolve(stats),
}

describe('When creating a pokemon dto', () => {
  it('should return the meta data from a pokemon', async () => {
    const pokemon: Pokemon = await buildPokemon(pokemonBuilder, id)

    expect(pokemon.id).toBe(pokemonMock.id)
    expect(pokemon.pokedexNumber).toBe(pokemonMock.pokedexNumber)
    expect(pokemon.name).toBe(pokemonMock.name)
    expect(pokemon.weight).toBe(pokemonMock.weight)
    expect(pokemon.height).toBe(pokemonMock.height)
    expect(pokemon.types.sort()).toEqual(pokemonMock.types.sort())
    expect(pokemon.sprite).toBe(pokemonMock.sprites.normal)
  })

  it('should allow others to build my own base pokemon data', async () => {
    const pokemon: Pokemon = await buildPokemon(pokemonBuilder, id)

    expect(pokemon.isShiny).toBeFalsy()
    expect(pokemon.customName).toBe(baseInfo.customName)
    expect(pokemon.gender).toBe(baseInfo.gender)
    expect(pokemon.isShiny).toBe(baseInfo.isShiny)
  })

  it('should allow others to build my own moves', async () => {
    const pokemon: Pokemon = await buildPokemon(pokemonBuilder, id)

    expect(pokemon.moves).toEqual(moves)
  })

  it('should allow others to build my own stats', async () => {
    const pokemon: Pokemon = await buildPokemon(pokemonBuilder, id)

    expect(pokemon.stats).toEqual(pokemonMock.stats)
  })
})
