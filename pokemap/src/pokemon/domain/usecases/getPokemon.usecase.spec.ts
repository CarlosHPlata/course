import { pokemonGatewayMock } from "@test/pokemon/mocks/pokemon.gateway";
import { pokemonMock } from "@test/pokemon/mocks/pokemon.mock";
import { PokemonData } from "../dtos";
import makeGetPokemon, { getPokemonFn } from "./getPokemon.usecase";

describe('When asking for a pokemon', () => {
  let getPokemon:getPokemonFn = makeGetPokemon(pokemonGatewayMock);

  let pikachu: PokemonData
  beforeEach(() => {
    pikachu = pokemonMock;
  });
  
  it('should retrieve a pokemon by id', async () => {
    const id = pikachu.id;
    const pokemon = await getPokemon({id});

    expect(pokemon).toEqual(pikachu);
  });

  it('should retrieve a pokemon by name', async () => {
    const name = pikachu.name;
    const pokemon = await getPokemon({name});

    expect(pokemon).toEqual(pikachu);
  });

  it('should throw an error when neither name or id is passed', async () => {
    expect.assertions(1);
    try {
      await getPokemon({})
    } catch (e) {
      expect(e).toEqual(new Error("To get a pokemon we need a name or id"))
    }
  });

});