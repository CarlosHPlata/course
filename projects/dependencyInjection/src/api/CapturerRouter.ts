import { Router } from 'express'
import { Pokemon } from './dtos/pokemon.dto'
import { Capturer } from './Capturer'

const CapturerRouter = Router()

CapturerRouter.post('/capturer/:id/try', (httpRequest, httpResponse) => {
  const [trainerId, wildPokemon] = getRequestInformation(httpRequest)
  if (wildPokemon == null || trainerId == null) httpResponse.status(501).send('No body')

  new Capturer()
    .withId(trainerId)
    .tryCapture(wildPokemon)
    .then(capturedInformation => httpResponse.send(capturedInformation))
    .catch((e) => console.log(e))
})





CapturerRouter.get('*', (_, res) => res.status(404).send('Not found'))



// === helpers should be in helpers.ts =========
interface InferredReqParams { params: { id: string }, body: Pokemon }
const getRequestInformation = (req: InferredReqParams): [number, Pokemon] => {
  const trainerId = parseInt(req.params.id)
  const wildPokemon = req.body

  return [trainerId, wildPokemon]
}

export default CapturerRouter
