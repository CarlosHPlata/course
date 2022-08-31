
export function foo(array: number[]) {
    let product = 1
    
    const sum = array.reduce((n, curr) => {
        return n+curr 
    }, 0)

    for (let num of array) {
        product *= num
    }

    return [sum, product]
}

export const ANSWER_B = 'O(n)'
