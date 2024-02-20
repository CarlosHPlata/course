import { Router } from 'express'
import { RequestData } from './model/Request'
import { checkInFlow, initFLow } from '../checkin/services/CheckInFlow'

const CheckInRouter = Router()

CheckInRouter.post('/continue', (httpRequest, httpResponse) => {
  const body: RequestData = httpRequest.body as RequestData
  checkInFlow(body)
    .then((response) => httpResponse.send(response))
    .catch((e) => {
      console.error(e)
      httpResponse.status(501).send('not working')
    })
})

CheckInRouter.post('/init', (httpRequest, httpResponse) => {
  const body: RequestData = httpRequest.body as RequestData
  initFLow(body)
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
