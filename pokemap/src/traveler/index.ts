import { Router } from 'express'
import { Point } from './dtos'
import { zoneFinder } from './infrastructure/zoneFinder'
import { ZoneFinder } from './interfaces/ZoneFinder'
import Traveler from './useCases/travel'

const router = Router()

router.get('/travelto', (req, res) => {
  const { lat, long } = req.query
  if (lat == null || long == null) res.status(501).send('No zone found')

  const pos: Point = {
    lat: lat as any,
    long: long as any,
  }

  const fake: ZoneFinder = () =>
    Promise.resolve({
      id: 1,
      name: 'string',
      families: [],
    })

  new Traveler(zoneFinder).travelTo(pos).then((context) => res.send(context))
})

export default router
