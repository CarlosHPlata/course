import { Gender, Move, PokemonMetaData } from './metadata'

export type Pokemon = PokemonMetaData &
  PokemonBaseData & {
    pcId?: number
    moves: PokemonMoves
    sprite: string
  }

export type PokemonBaseData = {
  customName?: string
  gender: Gender
  isShiny: boolean
}

export type PokemonMoves = [PokemonMove, PokemonMove, PokemonMove, PokemonMove]
export type PokemonMove = Move | null
