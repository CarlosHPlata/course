import { Answers, fetchAnswer } from '../../helpers'
import {ANSWER_A} from './a_ett'
import {ANSWER_B} from './b_tva'
import {ANSWER_C} from './c_tre'
import {ANSWER_D} from './d_fyra'
import {ANSWER_E, EXTRA_POINT} from './e_fem'

const answers = {
    'a': ANSWER_A,
    'b': ANSWER_B,
    'c': ANSWER_C,
    'd': ANSWER_D,
    'e': ANSWER_E,
}
const excercises = ['a', 'b', 'c', 'd', 'e']

describe('evaluating BigO excercises', () => {
    for (let excercise of excercises) {
        it(`should answer correctly excercise ${excercise}`, async () => {
            const res = await fetchAnswer(excercise, answers[excercise])

            expect(res).toBe(Answers.CORRECT)
        });
    }

    it('should answer the extra point 1', async () => {
        const res = await fetchAnswer('extra1', EXTRA_POINT)

        expect(res).toBe(Answers.CORRECT)
    });
})
