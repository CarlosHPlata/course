import { Router } from 'express'
import { RequestData } from './model/Request'
import { FlowFacade } from '../checkin/services/FlowFacade'
import sessionManager from '../checkin/services/sessionManager'

const CheckInRouter = Router()

CheckInRouter.post('/init', (httpRequest, httpResponse) => {
  const body: RequestData = httpRequest.body as RequestData
  new FlowFacade(sessionManager).init(body)
    .then((response) => httpResponse.send(response))
    .catch((e) => {
      console.error(e)
      httpResponse.status(501).send('not working')
    })
})

CheckInRouter.post('/continue', (httpRequest, httpResponse) => {
  const body: RequestData = httpRequest.body as RequestData
  new FlowFacade(sessionManager).checkIn(body)
    .then((response) => httpResponse.send(response))
    .catch((e) => {
      console.error(e)
      httpResponse.status(501).send('not working')
    })
})

CheckInRouter.get('/ping', (_, httpResponse) => {
  httpResponse.send('pong')
})

export default CheckInRouter
