import { UUID } from 'crypto'
import { RequiredField } from '../../checkin/model/Schema'

export interface ResponseData {
  sessionId: UUID
  status: 'user_information_required' | 'completed' | 'rejected'
  requiredFiles?: Partial<Record<RequiredField, unknown>>
}
