import { UUID } from 'crypto'
import { RequiredField } from '../../checkin/model/Schema'

export interface RequestData {
  sessionId: UUID
  userId: string
  flightNumbers: string[]
  fields?: Partial<Record<RequiredField, unknown>>
}
