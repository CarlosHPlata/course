import {
  FamilyDto,
  Point,
  ZoneDto,
} from "../../domain/useCases/portsResponses/input.dtos";
import IZoneGateway from "../../domain/interfaces/zone.gateway";
import * as DB from "../../../dbcon";

const GMAPS_KEY = "AIzaSyA9ASegTHsLgBJPQkq6A_CUTCqL-agqnhY";
const GMAPS_URL = "https://maps.googleapis.com/maps/api/geocode/json";

export const zoneGateway: IZoneGateway = {
  getZoneByPosition: async (position: Point): Promise<ZoneDto> => {
    const country = await getCountry(position);
    let zone: ZoneDto = await getZoneFromDb(country);
    zone = await fillFamilies(zone);

    return zone;
  },
};

const getCountry = async ({ lat, long }: Point): Promise<string> => {
  const url = `${GMAPS_URL}?key=${GMAPS_KEY}&latlng=${lat},${long}&sensor=false`;
  const api = await fetch(url);
  const googleRes = await api.json();

  const success = googleRes.results.find((r: any) => {
    return r.types.includes("country");
  });

  if (!success) return "sea";

  return success.address_components[0].short_name;
};

const COUNTRY_UNKNOWN = "unknown";
const getZoneFromDb = async (country: string): Promise<ZoneDto> => {
  const res = await DB.runQuery(
    `SELECT * FROM zone WHERE zone.country_code = "${country}"`
  );

  if (res.results.length === 0) {
    if (country !== COUNTRY_UNKNOWN) return getZoneFromDb(COUNTRY_UNKNOWN);
    else throw new Error("country not in DB");
  }

  return {
    id: res.results[0].id,
    name: res.results[0].country_code,
    families: [],
  };
};

const fillFamilies = async (zone: ZoneDto):Promise<ZoneDto> => {
  const query = `
    select family.name as familyName, family_zone.probability as probability, pokemon.id as id, pokemon.name as name from family_zone
    left join family on family_zone.family_id = family.id
    left join family_pokemon on family_pokemon.family_id = family.id
    left join pokemon on family_pokemon.pokemon_id = pokemon.id
    where family_zone.zone_id = ${zone.id};
  `;
  const res = await DB.runQuery(query);

  if (res.results.length === 0) throw new Error("zone with no pokemons");

  const famMap: Record<string, FamilyDto> = {};
  res.results.forEach((rowData) => {
    if (!famMap[rowData.familyName]){
      famMap[rowData.familyName] = {
        probability: rowData.probability,
        pokemons: [],
      };
    }
      
    famMap[rowData.familyName].pokemons.push({ id: rowData.id, name: rowData.name });
  });

  const families: FamilyDto[] = Object.entries(famMap).map(fam => {
    const [, famArr] = fam;
    return famArr
  })

  return { ...zone, families }
};
