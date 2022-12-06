# POKEMAP

<p align="center">
  <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png" alt="pikachu" width="200"/>
</p>

Hello This is a private package for educational purposes.

Things exported:

## Functions:

```ts
const getPokemonData: (findOptions: FindOptions) => Promise<PokemonData>

const createPokemon: (
  findOptions: FindOptions,
  injections: Injections
) => Promise<Pokemon>

type Injections = {
  getBaseData: IPokemonBaseData
  getPokemonMoves: IPokemonMovesGen
  getPokemonStats: IPokemonStatsGen
}

type IPokemonBaseData = (data: {
  id: number
  name: string
}) => Promise<PokemonBaseData>
type IPokemonMovesGen = (allMoves: Move[]) => Promise<PokemonMoves>
type IPokemonStatsGen = (statsData: PokemonStats) => Promise<PokemonStats>
```

## types

### Pokemon Types

```ts
interface Pokemon {
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

export type PokemonStats = {
  hp: Stat
  attack: Stat
  defense: Stat
  specialAttack: Stat
  specialDefense: Stat
  speed: Stat
}

export type Move = {
  name: string
  level: number
}

export type Stat = {
  base: number
  maxEvs: number
}

type PokemonData = {
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
```

## Mocks

```ts
//use with:
import { testmocks } from '@clean/pokemon'
```
