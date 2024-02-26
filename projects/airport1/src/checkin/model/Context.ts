
import { ResponseData } from '../../http/model/Response'
import { RequestData } from '../../http/model/Request'
import { Builder, IBuilder } from 'builder-pattern'
import { Session } from './session'

type WithBuilderCB<T> = (b: IBuilder<T>) => IBuilder<T>

export class Context {
  constructor(
    protected session: Session,
    protected request: RequestData,
    protected response: ResponseData
  ) { }

  getSession(): Session {
    return Object.freeze(this.session)
  }

  getResponse(): ResponseData {
    return Object.freeze(this.response)
  }

  getRequest(): RequestData {
    return Object.freeze(this.request)
  }

  withSessionBuilder(cb: WithBuilderCB<Session>): Context {
    this.session = cb(Builder<Session>(this.session)).build()

    return this
  }

  withResponseBuilder(cb: WithBuilderCB<ResponseData>): Context {
    this.response = cb(Builder<ResponseData>(this.response)).build()

    return this
  }

  withRequestBuilder(cb: WithBuilderCB<RequestData>): Context {
    this.request = cb(Builder<RequestData>(this.request)).build()

    return this
  }
}
