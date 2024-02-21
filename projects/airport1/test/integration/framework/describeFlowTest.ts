import { Application } from 'express'
import { useRedisClient } from '../../../src/external/initRedis'
import { getServer } from '../../../src/http/server'

const describeFlowTest = (message: string, cb: (app: Application) => void): void => {
  const app = getServer(true)

  describe(message, () => {
    cb(app)

    afterAll(async () => {
      await useRedisClient()
        .then(async (client) => {
          if (client.isOpen) {
            await client.quit()
          }
        })
        .then(() => {
          if (process.env.LOG !== 'false') {
            console.log('disconnecting redis')
          }
        })
    })
  })
}

export default describeFlowTest
