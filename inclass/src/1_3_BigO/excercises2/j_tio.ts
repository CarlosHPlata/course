
export const whatIsThis = (n: number[]) => {
    magicFn(n, 0, n.length-1)
}

const magicFn = (n: number[], min: number, max: number) => {
    if (min < max) {
        let mid = partition(n, min, max)

        magicFn(n, min, mid-1)
        magicFn(n, mid+1, max)
    }
}


const partition = (n: number[], min: number, max: number) => {
    let pivot = n[max]

    let index = min-1

    for (let i=min; i<max; i++) {
        if (n[i] < pivot) {
            i++
            swap(n, index, i)
        }
    }

    swap(n, index+1, max)
    return (index+1) 
}

const swap = (n: number[], i: number, j: number) => {
    let temp = n[i]
    n[i] = n[j]
    n[j] = temp
}


export const ANSWER_J = 'O(1)'
export const EXTRA_POINT = 'Which algorythm is this one'
