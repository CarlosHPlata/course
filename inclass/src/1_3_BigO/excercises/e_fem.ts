
export const whatIsThis = (arr: number[], x: number) => {
    let start = 0
    let end = arr.length-1

    while (start<=end) {
        let mid = Math.floor((start + end)/2)

        if (arr[mid] === x) return true
        else if (arr[mid] < x) start = mid+1
        else end = mid - 1
    }
    return false
}

export const ANSWER_E='O(1)'
export const EXTRA_POINT='what algorythm is this one'
