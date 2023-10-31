
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
  normal: string
  female: string | null
  shiny: string
  femaleShiny: string | null
}

export type Move = {
  name: string
  level: number
}

export type PokemonStats = {
  hp: Stat
  attack: Stat
  defense: Stat
  specialAttack: Stat
  specialDefense: Stat
  speed: Stat
}

export type Stat = {
  base: number
  maxEvs: number
}
