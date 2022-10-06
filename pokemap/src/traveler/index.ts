import { Router } from 'express'
import { Point } from './dtos'
import Traveler from './useCases/travel'

const router = Router()

router.get('/travelto', (req, res) => {
  const { lat, long } = req.query
  if (lat == null || long == null) res.status(501).send('No zone found')

  const pos: Point = {
    lat: lat as any,
    long: long as any,
  }

  new Traveler().travelTo(pos).then((context) => res.send(context))
})

export default router
