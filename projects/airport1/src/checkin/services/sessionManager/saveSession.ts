import { ISaveSessionRepository } from '../../interfaces/ISessionRepository'
import { Session } from '../../model/session'

export const DEFAULT_TTL = '30'

export const makeSaveSession = (repository: ISaveSessionRepository) => async (session: Session) => {
  const MAX_SESSION_TTL = parseInt(process.env.MAX_SESSION_TTL ?? DEFAULT_TTL)

  return await repository(session, MAX_SESSION_TTL)
}
