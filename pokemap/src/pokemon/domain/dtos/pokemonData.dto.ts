import { Move, PokemonStats } from "./pokemon.dto"

export type PokemonData = {
  id: number
  pokedexNumber: number
  name: string
  weight: number
  height: number
  moves: Move[]
  sprites: Sprites
  stats: PokemonStats
  types: string[]
}

export type Sprites = {
  normal: string,
  female: string|null,
  shiny: string,
  femaleShiny: string|null
}
