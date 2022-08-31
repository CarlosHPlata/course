
export function factorial(n: number) {
    if (n < 0) return -1
    else if (n === 0) return 1

    return n * factorial(n-1)
}

export const ANSWER_D = 'O(n)'
