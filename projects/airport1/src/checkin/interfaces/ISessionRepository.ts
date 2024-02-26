import { Session } from '../model/session'

export type ISaveSessionRepository = (session: Session, ttl: number) => Promise<void>
export type IGetSessionRepository = (sessionId: string) => Promise<Session | null>
