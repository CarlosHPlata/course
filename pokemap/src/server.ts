import express from 'express'

const server = express()
export const port = process.env.PORT ?? 4000

export default server
