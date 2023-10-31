import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import InfoRouter from './router'


const initServer = () => {
  const server = express()

  const PORT = process.env.PORT
  if (PORT == null) {
    throw new Error('Please create an .env file with all correct values like the .env.example')
  }

  server.listen(PORT, () => {
    console.log(`application is running on port ${PORT ?? ''}.`)
  })

  setServerConfigurations(server)
  setServerLogger(server)

  server.use(InfoRouter)
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
