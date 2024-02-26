import { IGetSessionRepository } from '../../../src/checkin/interfaces/ISessionRepository'
import { Session } from '../../../src/checkin/model/session'

const generateGetSessionRepositoryMock =
  (session: Session | null = null): IGetSessionRepository => jest.fn(
    (): Promise<Session | null> => Promise.resolve(session)
  )

export default generateGetSessionRepositoryMock
