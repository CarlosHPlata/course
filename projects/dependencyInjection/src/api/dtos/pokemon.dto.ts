export interface Pokemon {
  id: number
  pcId?: number
  pokedexNumber: number
  name: string
  customName?: string
  weight: number
  height: number
  gender: Gender
  isShiny: boolean
  types: string[]
  moves: PokemonMoves
  sprite: string
  stats: PokemonStats
}

export type PokemonMoves = [PokemonMove, PokemonMove, PokemonMove, PokemonMove]
export type PokemonMove = Move | null

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface PokemonStats {
  hp: Stat
  attack: Stat
  defense: Stat
  specialAttack: Stat
  specialDefense: Stat
  speed: Stat
}

export interface Move {
  name: string
  level: number
}

export interface Stat {
  base: number
  maxEvs: number
}
