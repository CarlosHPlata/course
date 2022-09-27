import IZoneGateway from "../../../packages/traveler/domain/interfaces/zone.gateway";
import { ZoneDto } from "../../../packages/traveler/domain/useCases/portsResponses/input.dtos";
import { makePokemonDto } from "./pokemon.mock";

export const zoneGatewayMock: IZoneGateway = {
  getZoneByPosition: jest.fn(() => Promise.resolve(zoneDto)),
};

export const zoneDto: ZoneDto = {
  id: 1,
  name: "test",
  families: [
    {
      probability: 1,
      pokemons: [ makePokemonDto('pikachu') ],
    },
  ],
};