import { Gender } from "../dtos";

export type FindOptions = { name?: string; id?: number };
export type PokemonBaseData = {
  customName?: string
  gender: Gender
  isShiny: boolean
}