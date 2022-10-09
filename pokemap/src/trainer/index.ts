import { Router } from 'express'
import { getPokemons } from './useCases/getPokemons'

const TrainerRouter = Router()

TrainerRouter.get('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  res.send({ id, name: 'Ash Ketchup' })
})

TrainerRouter.get('/:id/pokemon', (req, res) => {
  const id = parseInt(req.params.id)

  getPokemons(id).then((pokemons) => res.send(pokemons))
})

export default TrainerRouter
