const fs = require('fs');

const data = fs.readFileSync('count_inversions_input.txt', 'utf8');
const numbers = data.split('\n').map(line => line.trim()) .filter(line => line !== '').map(Number);          


//const input = [6, 5, 4, 3, 2, 1] // output: 15
//const input = [2, 3, 8, 6, 1] // output: 5
const input = [10, 3, 8, 15, 6, 12, 2, 18, 7] // output: 17

function countInversions(array) {
    if (array.length == 1) return { sortedArray: array, count: 0}
    let count = 0

    const arrayHalf = (array.length) / 2

    const subArray1 = array.slice(0, arrayHalf)
    const subArray2 = array.slice(arrayHalf, array.length)

    const { sortedArray: leftSorted, count: countLeft } = countInversions(subArray1)
    const { sortedArray: rightSorted, count: countRight } = countInversions(subArray2)
    const { sortedArray: mergeSorted, count: countMerge } = merge(leftSorted, rightSorted)

    count += countLeft + countRight + countMerge

    return { sortedArray: mergeSorted, count }
}


function merge(array1, array2) {
    let mergedArray = []
    let count = 0
    let i = 0
    let j = 0

    while (i < array1.length || j < array2.length) {
        if (array1[i] < array2[j]) {
            mergedArray.push(array1[i])
            i++
        } else if (array1[i] > array2[j]) {
            mergedArray.push(array2[j])
            j++
            count += (array1.length - i)
        } else if (i == array1.length) {
            mergedArray.push(array2[j])
            j++
        }
        else if (j == array2.length) {
            mergedArray.push(array1[i])
            i++
        }
    }

    return { sortedArray: mergedArray, count }
}


//output = countInversions(input)
//console.log(output)

const asigmentOutput = countInversions(numbers)
console.log(asigmentOutput.count)