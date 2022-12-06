import { trainerGatewayMock } from "@test/trainer/trainer.gateway.mock";
import makeGetPokemons from "./getPokemons.usecase";

describe('When requesting a training pokemon list', () => {
  const getPokemons = makeGetPokemons(trainerGatewayMock);

  it('should retrieve a list of pokemons', async () => {
    const pokemons = await getPokemons(1);

    expect(pokemons.length).toBeGreaterThan(0);
    expect(trainerGatewayMock.getPokemonsFromTrainer).toHaveBeenCalled();
  });

});