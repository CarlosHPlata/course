import { Router } from 'express'

const InfoRouter = Router()

InfoRouter.get('/info/:id', (httpRequest, httpResponse) => {
  const pokemonId = parseInt(httpRequest.params.id)

  httpResponse.send({ success: true, pokemonId })
})


InfoRouter.get('*', (_, res) => res.status(404).send('Not found'))

export default InfoRouter
