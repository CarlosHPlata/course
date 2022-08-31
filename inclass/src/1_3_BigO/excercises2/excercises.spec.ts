import { Answers, fetchAnswer } from '../../helpers'
import {ANSWER_F} from './f_sx';
import {ANSWER_G} from './g_sju';
import {ANSWER_H} from './h_otta';
import {ANSWER_I} from './i_nio';
import {ANSWER_J, EXTRA_POINT} from './j_tio';

const answers = {
    'f': ANSWER_F,
    'g': ANSWER_G,
    'h': ANSWER_H,
    'i': ANSWER_I,
    'j': ANSWER_J,
}
const excercises = ['f', 'g', 'h', 'i', 'j']

describe('evaluating BigO excercises', () => {
    for (let excercise of excercises) {
        it(`should answer correctly excercise ${excercise}`, async () => {
            const res = await fetchAnswer(excercise, answers[excercise])

            expect(res).toBe(Answers.CORRECT)
        });
    }

    it('should answer the extra point 1', async () => {
        const res = await fetchAnswer('extra2', EXTRA_POINT)

        expect(res).toBe(Answers.CORRECT)
    });
})

