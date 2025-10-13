const input = [6, 2, 8, 3, 4, 1, 7, 5]

function mergeSort(array) {
    if (array.length == 1) return array //# Base

    const arrayHalf = (array.length) / 2

    const subArray1 = array.slice(0, arrayHalf)
    const subArray2 = array.slice(arrayHalf, array.length)

    const splitArray1 = mergeSort(subArray1)
    const splitArray2 = mergeSort(subArray2)

    const mergedArray = merge(splitArray1, splitArray2)
    return mergedArray  
}


function merge(array1, array2) {
    let mergedArray = []
    let i = 0
    let j = 0

    while (i < array1.length || j < array2.length) {
        if (i === array1.length) {  
            sortedPoints.push(array2[j])
            j++
        } else if (j === array2.length) { 
            sortedPoints.push(array1[i])
            i++
        } else if (array1[i][sortByPosition] < array2[j][sortByPosition]) {
            sortedPoints.push(array1[i])
            i++
        } else {
            sortedPoints.push(array2[j])
            j++
        }
    }
   
    return mergedArray
}






output = mergeSort(input)

console.log(output)