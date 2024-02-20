import { UUID } from 'crypto'
import { CountryCode, RequiredField } from '../../checkin/model/Schema'

export interface RequestData {
  country: CountryCode
  sessionId: UUID
  userId: string
  flightNumbers: string[]
  fields?: Partial<Record<RequiredField, unknown>>
}
