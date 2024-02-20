import * as dotenv from 'dotenv'
import { useRedisClient } from './src/external/initRedis'
import initServer from './src/http/server'

dotenv.config()

useRedisClient()
  .then(() => initServer())
  .catch((e) => {
    console.log(e)
    process.exit()
  })

process.on('SIGINT', () => {
  useRedisClient()
    .then(async client => {
      if (client.isOpen) { await client.quit() }
    })
    .then(() => {
      if (process.env.LOG !== 'false') {
        console.log('closing redis connection')
      }
      process.exit()
    })
    .catch((e) => {
      console.log(e)
      process.exit()
    })
})
