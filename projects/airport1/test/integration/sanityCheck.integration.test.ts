import request from 'supertest'
import { getServer } from '../../src/http/server'

describe('Testing', () => {
  const app = getServer(true)

  it('should be able to ping', async () => {
    const res = await request(app).get('/ping')

    expect(res.statusCode).toBe(200)
  })
})
