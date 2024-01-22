/* eslint-disable */
import { ANSWER_A } from '../algorithm1'
import { ANSWER_J, EXTRA_POINT2 } from '../algorithm10'
import { ANSWER_B } from '../algorithm2'
import { ANSWER_C } from '../algorithm3'
import { ANSWER_D } from '../algorithm4'
import { ANSWER_E, EXTRA_POINT1 } from '../algorithm5'
import { ANSWER_F } from '../algorithm6'
import { ANSWER_G } from '../algorithm7'
import { ANSWER_H } from '../algorithm8'
import { ANSWER_I } from '../algorithm9'


import { ANSWERS, isCorrect } from './helper'

const yourAnswers = [
    ANSWER_A,
    ANSWER_B,
    ANSWER_C,
    ANSWER_D,
    ANSWER_E,
    ANSWER_F,
    ANSWER_G,
    ANSWER_H,
    ANSWER_I,
    ANSWER_J,
]
const CORRECT = 'CORRECT'
const INCORRECT = 'INCORRECT'

describe('Name of the group', () => {
    for (let index = 0; index < yourAnswers.length; index++) {
        it(`Your response from algorithm ${index} should be correct`, () => {
            const response = isCorrect(yourAnswers[index], index, ANSWERS)
                ? CORRECT
                : INCORRECT

            expect(response).toBe(CORRECT)
        })
    }

    it('For extra point 1, name of the algorythm', () => {
        const response = isCorrect(EXTRA_POINT1, 10, ANSWERS) ? CORRECT : INCORRECT

        expect(response).toBe(CORRECT)
    })

    it('For extra point 2, name of the algorythm', () => {
        const response = isCorrect(EXTRA_POINT2, 11, ANSWERS) ? CORRECT : INCORRECT

        expect(response).toBe(CORRECT)
    })
})