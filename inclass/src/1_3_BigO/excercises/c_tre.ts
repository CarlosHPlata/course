
//assume a and b
export const printUnorderedPairs = (arrayA: number[], arrayB: number[]) => {
    arrayA.forEach(a => {
        helper(a, arrayB)
    })
}

const helper = (a: number, arrayB: number[]) => {
    let i = 0
    while (i<arrayB.length) {
        if (a > arrayB[i]) console.log(a, arrayB[i])
        i++
    }
}

export const ANSWER_C = 'O(ab)'
