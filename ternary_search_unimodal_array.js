//You are a given a unimodal array of n distinct elements, m
//eaning that its entries are in increasing order up until its maximum element,
//after which its elements are in decreasing order.
//Give an algorithm to compute the maximum element that runs in O(log n) time.

//const input = [5, 9, 15, 20, 17, 13, 8]; // expectedOutput = 20
//const input = [1, 2, 3, 4, 9, 5]; // expectedOutput = 9
const input = [2, 6, 12, 18, 25, 40, 35, 28, 20, 15, 10, 5, 3] // expectedOutput = 40

const ternarySearch = (array) => {
    if (array.length < 3) return -1
    if (array.length == 3) return getPeak(array)

    const middle = Math.floor(array.length / 2)

    //note: Array.slice is O(n) this prevent the function to be O(log n)
    if (array[middle] < array[middle + 1]) {
        return ternarySearch(array.slice(middle, array.length))
    } else if (array[middle] < array[middle - 1]) {
        return ternarySearch(array.slice(0,middle+1))
    } else if (array[middle - 1] < array[middle] && array[middle] > array[middle+1]){
        return array[middle]
    } else {
        return -1
    }
}

const getPeak = (array) => {
    const middle = array[1]
    return (array[0] < middle  && middle > array[2])? middle : -1
}

const output = ternarySearch(input)
console.log(output)