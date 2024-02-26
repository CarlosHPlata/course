import { Response } from 'supertest'
import { RequiredField } from '../../../src/checkin/model/Schema'

const requiredField = (requiredFiled: RequiredField, response: Response): void => {
  expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
  expect(response.body.status).toBe('user_information_required')
  expect(response.body.requiredFiles).toBeDefined()
  expect(response.body.requiredFiles[requiredFiled]).toBeDefined()
}

const completed = (response: Response): void => {
  expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
  expect(response.body.status).toBe('completed')
}

const rejected = (response: Response): void => {
  expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
  expect(response.body.status).toBe('rejected')
}

export default {
  userInformation: {
    requiredField
  },
  status: {
    rejected,
    completed
  }
}
