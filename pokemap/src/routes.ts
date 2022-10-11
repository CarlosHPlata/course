import { Router } from 'express'
import TrainerRouter from './trainer'
import TravelerRouter from './traveler'
const router = Router()

router.use('/traveler', TravelerRouter)
router.use('/trainer', TrainerRouter)

router.get('*', (req, res) => res.status(404).send('Not found'))

export default router
