export type Point = { 
    lat: number
    long: number
}

export type PokemonDto = {
    id: number
    name: string
}

export type FamilyDto = { 
    probability: number
    pokemons: PokemonDto[] 
}

export type ZoneDto = {
    id: number
    name: string
    families: FamilyDto[]
}