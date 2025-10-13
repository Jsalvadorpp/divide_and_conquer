//You are given a sorted(from smallest to largest) array A of n distinct integers which can be positive,
//negative, or zero.You want to decide whether or not there is an index i such that A[i] = i.
//Design the fastest algorithm that you can for solving this problem.

//const input = [-8, -3, 0, 1, 2, 5] //expectedOutput: true , because A[5] = 5
//const input = [-12, -6, -2, 0, 1, 4, 6, 8, 10]; //expectedOutput: true because A[6] = 6
const input = [-10, -5, -2, 0, 2, 6, 9, 12, 17]; //expectedOutput: false


const getFixedPoint = (array,start = 0, end=array.length-1) => {
    if (start == end) {  //is like an array.length == 1
        if (array[start] == start) {
            console.log(array[start])
            console.log(start)
        }
        return array[start] == start
    };

    const middle = Math.floor((start + end) / 2)

    const leftResult = getFixedPoint(array, start,middle)
    const rightResult = getFixedPoint(array, middle+1, end)

    return leftResult || rightResult
}

const output = getFixedPoint(input)
console.log(output)