export interface PokemonAPIRes {
  abilities: Ability2[]
  base_experience: number
  forms: Ability[]
  game_indices: Gameindex[]
  height: number
  held_items: Helditem[]
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: Move[]
  name: string
  order: number
  species: Ability
  sprites: Sprites
  stats: Stat[]
  types: Type[]
  weight: number
}

export interface Type {
  slot: number
  type: Ability
}

export interface Stat {
  base_stat: number
  effort: number
  stat: Ability
}

export interface Sprites {
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
  other: Other
  versions: Versions
}

export interface Versions {
  'generation-i': Generationi
  'generation-ii': Generationii
  'generation-iii': Generationiii
  'generation-iv': Generationiv
  'generation-v': Generationv
  'generation-vi': Generationvi
  'generation-vii': Generationvii
  'generation-viii': Generationviii
}

export interface Generationviii {
  icons: Dreamworld
}

export interface Generationvii {
  icons: Dreamworld
  'ultra-sun-ultra-moon': Home
}

export interface Generationvi {
  'omegaruby-alphasapphire': Home
  'x-y': Home
}

export interface Generationv {
  'black-white': Blackwhite
}

export interface Blackwhite {
  animated: Animated
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
}

export interface Animated {
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
}

export interface Generationiv {
  'diamond-pearl': Diamondpearl
  'heartgold-soulsilver': Diamondpearl
  platinum: Diamondpearl
}

export interface Diamondpearl {
  back_default: string
  back_female?: string
  back_shiny: string
  back_shiny_female?: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
}

export interface Generationiii {
  emerald: Emerald
  'firered-leafgreen': Fireredleafgreen
  'ruby-sapphire': Fireredleafgreen
}

export interface Fireredleafgreen {
  back_default?: string
  back_shiny?: string
  front_default?: string
  front_shiny?: string
}

export interface Emerald {
  front_default?: string
  front_shiny?: string
}

export interface Generationii {
  crystal: Crystal
  gold: Gold
  silver: Gold
}

export interface Gold {
  back_default?: string
  back_shiny?: string
  front_default?: string
  front_shiny?: string
  front_transparent?: string
}

export interface Crystal {
  back_default?: string
  back_shiny?: string
  back_shiny_transparent?: string
  back_transparent?: string
  front_default?: string
  front_shiny?: string
  front_shiny_transparent?: string
  front_transparent?: string
}

export interface Generationi {
  'red-blue': Redblue
  yellow: Redblue
}

export interface Redblue {
  back_default?: string
  back_gray?: string
  back_transparent?: string
  front_default?: string
  front_gray?: string
  front_transparent?: string
}

export interface Other {
  dream_world: Dreamworld
  home: Home
  'official-artwork': Officialartwork
}

export interface Officialartwork {
  front_default: string
}

export interface Home {
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
}

export interface Dreamworld {
  front_default: string
  front_female?: string
}

export interface Move {
  move: Ability
  version_group_details: Versiongroupdetail[]
}

export interface Versiongroupdetail {
  level_learned_at: number
  move_learn_method: Ability
  version_group: Ability
}

export interface Helditem {
  item: Ability
  version_details: Versiondetail[]
}

export interface Versiondetail {
  rarity: number
  version: Ability
}

export interface Gameindex {
  game_index: number
  version: Ability
}

export interface Ability2 {
  ability: Ability
  is_hidden: boolean
  slot: number
}

export interface Ability {
  name: string
  url: string
}
