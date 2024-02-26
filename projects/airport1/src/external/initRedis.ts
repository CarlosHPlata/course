import { createClient } from 'redis'

let CLIENT: ReturnType<typeof createClient> | null = null

export const useRedisClient = async (): Promise<ReturnType<typeof createClient>> => {
  if (CLIENT === null || !CLIENT.isOpen || !CLIENT.isReady) {
    CLIENT = await createRedisClient()
  }

  return CLIENT
}

const createRedisClient = async (): Promise<ReturnType<typeof createClient>> => {
  const client = createClient({
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT ?? '6379')
    }
  })

  client.on('error', err => {
    console.log('Redis Client Error', err)
  })

  await client.connect().then(() => {
    process.env.LOG !== 'false' && console.log('connected to redis')
  })
  return client
}
