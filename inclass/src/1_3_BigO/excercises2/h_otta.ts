
export const square = (n: number) => {
    return findSquare(n, 1, n)
}

const findSquare = (n: number, min: number, max: number) => {
    if (max < min) return -1
    
    const guess = Math.floor((min + max)/2)

    if(guess * guess === n)
        return guess
    else if (guess * guess < n)
        return findSquare(n, guess+1, max)
    else
        return findSquare(n, min, guess-1)
}

export const ANSWER_H = 'O(1)'
