import { RequestData } from '@http/Request'
import { IGetSessionRepository } from '../../interfaces/ISessionRepository'
import { Session } from '../../model/session'

export const makeGetSession = (sessionRepository: IGetSessionRepository) => async (requestData: RequestData) => {
  const currentSession: Session | null = await sessionRepository(requestData.sessionId)

  if (!currentSession) {
    throw new Error('session does not exits')
  }

  return currentSession
}
