export const powersOf2 = (n:number) => {
    if (n<1) {
        return 0
    } else if (n === 1) {
        return 1
    }

    const prev = powersOf2(n/2)
    const curr = prev * 2
    return curr
}

export const ANSWER_G = 'O(1)'
