import { Router } from "express";
import { Pokemon } from "../../pokemon";
import { makeCapture } from "../domain/usecases/capturer.usecase";
import { trainerGateway } from "./gateways/trainer.gateway";

const CapturerRouter =  Router();
const capture = makeCapture(trainerGateway);

CapturerRouter.post('/:id/try', (req, res) => {
  const trainerId: number = parseInt(req.params.id);
  if (!req.body || trainerId == null) res.status(501).send('No body');

  const pokemon: Pokemon = req.body;
  capture(trainerId, pokemon).then(captured => res.send(captured));
});

export default CapturerRouter;