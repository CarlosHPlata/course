import server, { port } from './server'
import express, { NextFunction, Request, Response } from 'express'
import router from './routes'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()

server.listen(port, () => {
  console.log(`application is running on port ${port}.`)
})

server.use(cors())
server.use(express.json())
server.all('*', logRoute)

server.use(router)

function logRoute(req: Request, res: Response, next: NextFunction) {
  console.log(req.path)
  next()
}
