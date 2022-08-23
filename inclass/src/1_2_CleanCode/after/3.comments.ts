const generateRandomEncounter = () => ({ name: 'pikachu' })
const db = { runQuery: async () => ({ name: 'test', prob: 30 }) }
const fetch = async () => ({ address_components: [{ short_name: 'test' }] })

async function getCountry(position, fetch) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?key=123&latlng=${position.lang},${position.long}&sensor=false`;
  const googleRes = await fetch(url);
  const country = googleRes.address_components[0].short_name;
  
  return country
}

async function getZone(country, db) {
  const zone = await db.runQuery(
    `SELECT * FROM zone WHERE zone.country_code = "${country}"`
  );
  
  return zone
}

function isEncounterPossible(zone) {
  const MIN = 1;
  const MAX = 100;
  if ((Math.floor(Math.random() * (MAX - MIN + 1)) + MIN) <= zone.prob) {
    return true
  }
  return false
}

const travelTo = async( position, db, fetch ) => {
  const country = await getCountry(position, fetch)
  const zone = await getZone(country, db)

  let encounter;
  if (isEncounterPossible(zone)) {
    encounter = generateRandomEncounter()
  }

  return {
    zone: { name: zone.name },
    isEncounterPossible,
    encounter,
  };
}

travelTo({ lat: 1, long: 2 }, db, fetch)
  .then((res) => console.log(res))