import { Router } from "express";
import { Point } from "../../domain/useCases/portsResponses/input.dtos";
import TravelerUsecase from "../../domain/useCases/traveler.usecase";
import { pokemonGateway } from "../gateways/pokemon.gateway";
import { zoneGateway } from "../gateways/zone.gateway";

const router = Router();

const traveler = new TravelerUsecase(zoneGateway, pokemonGateway);

router.get('/travelto', (req, res) => {
  const { lat, long } = req.query;
  if (lat==null || long==null) res.status(501).send('No zone found');

  const pos: Point = {
    lat: lat as any,
    long: long as any
  };

  traveler.travelTo(pos).then((context) => res.send(context));
});


export default router;