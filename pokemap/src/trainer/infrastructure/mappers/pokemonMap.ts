import { createPokemon, Gender, Move, Pokemon, PokemonBaseData, PokemonMoves, PokemonStats } from "../../../pokemon";

export const mapPokemonRes = async (res: any[]): Promise<Pokemon[]> => {
  const pokemons: Record<number, Pokemon> = {};
  for (const row of res) {
    const id = row.pc_id;
    if (!pokemons[id]) {
      pokemons[id] = await mapPokemon(row.pokemon_id, res.filter(r => r.pc_id === id));
    }
  }

  return Object.entries(pokemons).map(([, entry]) => entry);
};

const mapPokemon = (pokemonId:number, pokeRes: any[]): Promise<Pokemon> => {
  return createPokemon({id: pokemonId}, {
    getBaseData: (): Promise<PokemonBaseData> => Promise.resolve({
      customName: pokeRes[0].custom_name || undefined,
      gender: pokeRes[0].is_male? Gender.MALE : Gender.FEMALE,
      isShiny: !!pokeRes[0].is_shiny
    }),

    getPokemonMoves: function (allMoves: Move[]): Promise<PokemonMoves> {
      const moves: PokemonMoves = [null, null, null, null];
      pokeRes.forEach((row, index) => {
        const moveInfo = allMoves.find(move => move.name === row.name);
        moves[index] = moveInfo ?? null;
      })

      return Promise.resolve(moves);
    },

    getPokemonStats: (): Promise<PokemonStats> => Promise.resolve({
        hp: {
          base: pokeRes[0].hp,
          maxEvs: pokeRes[0].hp_evs,
        },
        attack: {
          base: pokeRes[0].attack,
          maxEvs: pokeRes[0].attack_evs,
        },
        defense: {
          base: pokeRes[0].defense,
          maxEvs: pokeRes[0].defense_evs,
        },
        specialAttack: {
          base: pokeRes[0].special_attack,
          maxEvs: pokeRes[0].special_attack_evs,
        },
        specialDefense: {
          base: pokeRes[0].special_defense,
          maxEvs: pokeRes[0].special_defense_evs,
        },
        speed: {
          base: pokeRes[0].speed,
          maxEvs: pokeRes[0].speed_evs,
        }
      })
  })
}