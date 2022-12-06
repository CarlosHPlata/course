import { Router } from "express";
import { Pokemon } from "../../pokemon";
import makeGetPokemons from "../domain/usecases/getPokemons.usecase";
import makeGetTrainer from "../domain/usecases/getTrainer.usecase";
import { makeSavePokemon } from "../domain/usecases/save.pokemon.usecase";
import { trainerGateway } from "./trainer.gateway";

const TrainerRouter =  Router();

const getTrainer = makeGetTrainer(trainerGateway);
TrainerRouter.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  getTrainer(id).then(trainer => res.send(trainer));
});

const getPokemons = makeGetPokemons(trainerGateway);
TrainerRouter.get('/:id/pokemon', (req, res) => {
  const id = parseInt(req.params.id);

  getPokemons(id).then(pokemons => res.send(pokemons));
});

const savePokemon = makeSavePokemon(trainerGateway);
TrainerRouter.post('/:id/pokemon', (req, res) => {
  console.log('entranding');
  const trainerId = parseInt(req.params.id);
  if (!req.body || trainerId == null) res.status(501).send('No body');

  const pokemon: Pokemon = req.body;
  savePokemon(trainerId, pokemon).then(pokemon => res.send(pokemon));

});

export default TrainerRouter;