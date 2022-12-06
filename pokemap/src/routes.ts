import { Router } from 'express'
import CapturerRouter from './capturer/infrastructure'
import TrainerRouter from './trainer/infrastructure'
import TravelerRouter from './traveler'
const router = Router()

router.use('/traveler', TravelerRouter)
router.use('/capturer', CapturerRouter)
router.use('/trainer', TrainerRouter)

router.get('*', (req, res) => res.status(404).send('Not found'))

export default router
