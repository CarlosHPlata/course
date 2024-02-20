import { IGetSessionRepository, ISaveSessionRepository } from '../../checkin/interfaces/ISessionRepository'
import { Session } from '../../checkin/model/session'
import { useRedisClient } from '../initRedis'

export const saveSessionRepository: ISaveSessionRepository = async (session: Session, ttl: number) => {
  const redisClient = await useRedisClient()
  await redisClient.setEx(session.sessionId, ttl, JSON.stringify(session))
}

export const getSessionRepository: IGetSessionRepository = async (sessionId: string) => {
  const redisClient = await useRedisClient()
  const currentSessionString = await redisClient.get(sessionId)

  if (currentSessionString == null) {
    return null
  }

  return JSON.parse(currentSessionString) as Session
}
