
export const allFib = (n: number) => {
    const memo = {}
    for(let i=0; i<n; i++) {
        fibWithMemo(i, memo)
    }
}

const fibWithMemo = (n: number, memo: Record<number, number>) => {
    if (n <= 0) return 0
    else if (n == 1) return 1
    else if (memo[n] === undefined)
        memo[n] = fibWithMemo(n-1, memo) + fibWithMemo(n-2, memo)

    return memo[n]
}

export const ANSWER_F = 'O(1)'
