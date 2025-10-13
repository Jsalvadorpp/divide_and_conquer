//const input = [6, 2, 8, 3, 4, 1, 7, 5]
const input = [5, 3, 8, 3, 9, 1, 5, 7, 3, 8];

const quickSort = (array, start = 0, end = array.length - 1) => {
    const len = end - start + 1

    if(len<=1) return array

   
    let i = start - 1
    const pivot = array[end]


    for (let k = start; k < end; k++) {
        if (array[k] < pivot) {
            i++;
            const temp = array[i];
            array[i] = array[k];
            array[k] = temp;
        }
    }

    i++
    const temp = array[i]
    array[i] = pivot
    array[end] = temp

    quickSort(array,start,i - 1) //quickSort left side
    quickSort(array, i + 1, end) //quickSort right side

    return array
}


const output = quickSort(input)
console.log(output)