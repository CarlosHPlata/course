import { UUID } from 'crypto'
import { SessionData } from './SessionData'
import { UserInformation } from './UserInformation'

export interface Session {
  sessionId: UUID
  userId: string
  data: SessionData
  userInformation: UserInformation
}
