export type PokemonMetaData = {
  id: number;
  pokedexNumber: number;
  name: string;
  weight: number;
  height: number;
  types: string[];
  stats: PokemonStats;
};

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export type Move = {
  name: string;
  level: number;
};

export type PokemonStats = {
  hp: Stat;
  attack: Stat;
  defense: Stat;
  specialAttack: Stat;
  specialDefense: Stat;
  speed: Stat;
};

export type Stat = {
  base: number;
  maxEvs: number;
};
