
export const returnDuplicate = (a: number[], b: number[]) => {
    const duplicates = []

    a.forEach((element) => {
        if ( b.includes(element) ) duplicates.push(element)
    })

    return duplicates
}

export const ANSWER_I = 'O(1)'
