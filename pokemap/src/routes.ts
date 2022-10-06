import { Router } from 'express'
import TravelerRouter from './traveler'
const router = Router()

router.use('/traveler', TravelerRouter)

router.get('*', (req, res) => res.status(404).send('Not found'))

export default router
