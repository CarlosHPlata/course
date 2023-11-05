import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import CapturerRouter from './src/api/CapturerRouter'


const initServer = () => {
  const server = express()

  const PORT = process.env.PORT
  server.listen(PORT, () => {
    console.log(`application is running on port ${PORT ?? ''}.`)
  })

  setServerConfigurations(server)
  setServerLogger(server)

  server.use(CapturerRouter)
}

const setServerConfigurations = (server: any) => {
  server.use(cors())
  server.use(express.json())
}

const setServerLogger = (server: any) => {
  server.all('*', logRoute)

  function logRoute(req: Request, res: Response, next: NextFunction) {
    console.log(req.path)
    next()
  }
}

export default initServer
