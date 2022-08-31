
export const f = (n: number) => {
    if (n === 1) return 1

    return f(n-1) + f(n-2)
}

export const ANSWER_A = 'O(2^n)'
