import express, { NextFunction, Request, Response, Application } from 'express'
import cors from 'cors'
import CheckInRouter from './CheckInRouter'

const setControllers = (server: Application): void => {
  server.use(CheckInRouter)
}

const initServer = (): Application => {
  const server: Application = getServer()

  const PORT = process.env.PORT
  server.listen(PORT, () => {
    console.log(`application is running on port ${PORT ?? ''}.`)
  })

  return server
}

export const getServer = (turnOffLogger = false): Application => {
  const server: Application = express()

  setServerConfigurations(server)
  if (!turnOffLogger) {
    setServerLogger(server)
  }

  setControllers(server)

  return server
}

const setServerConfigurations = (server: any): void => {
  server.use(cors())
  server.use(express.json())
}

const setServerLogger = (server: any): void => {
  server.all('*', logRoute)

  function logRoute(req: Request, res: Response, next: NextFunction): void {
    console.log(req.path)
    next()
  }
}

export default initServer
