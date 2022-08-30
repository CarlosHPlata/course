
const URL = 'https://clean-answers.herokuapp.com/'
// const URL = 'http://localhost:3000/'
export const fetchAnswer = async (excercise: string, answer: string) => {
    const api = await fetch(`${URL}bigo/${excercise}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer })
    })

    const { isCorrect } = await api.json()

    return isCorrect
}

export enum Answers {
    CORRECT = 'correct',
    WRONG = 'wrong',
}
