//You are given an n by n grid of distinct numbers.
//A number is a local minimum if it is smaller than all of its neighbors. 
//(A neighbor of a number is one immediately above, below, to the left, or the right.
//Most numbers have four neighbors; numbers on the side have three; the four corners have two.)
//Use the divide - and - conquer algorithm design paradigm to compute a local minimum
//with only O(n) comparisons between pairs of numbers. 
//(Note: since there are n^2 numbers in the input,
//you cannot afford to look at all of them.
//Hint: Think about what types of recurrences would give you the desired upper bound.)

/* const grid = [               //expected output: 7 , position (1,1)
    [10, 8, 14, 16],
    [13, 7, 9, 11],
    [15, 12, 19, 21],
    [17, 18, 20, 22]
]; */

/* const grid = [.     //expectedOutput: { value: 1, position: [ 0, 0 ] }
    [1, 2, 3, 4],
    [16, 15, 14, 5],
    [17, 10, 13, 6],
    [18, 11, 12, 7]
]; */

const grid = [           // expectedOutput: { value: 7, position: [ 1, 1 ] }
    [10, 8, 14, 16],
    [13, 7, 9, 11],
    [15, 12, 19, 21],
    [17, 18, 20, 22]
];

const findLocallMinimum = (grid, start = 0, end = grid[0].length - 1) => {
    const len = end - start + 1

    if (len == 1) return { value: grid[start][start], position: [start, start] }
    if (len == 2) return find2GridMin(grid, start, end)
    
    const middle = Math.floor((start + end) / 2)

    const minValueRow = findMinValue(grid[middle], middle, start, end)
    const localMin = isLocalMin(grid, minValueRow.position, start, end)
    
    if (localMin) {
        return minValueRow
    } else {
        const minNeighbor = findMinNeighbor(grid, minValueRow.position, start, end)

        const newStart = minNeighbor.level == "top" ? start: middle+1
        const newEnd = minNeighbor.level == "top" ? middle: end

        return findLocallMinimum(grid, newStart, newEnd)
    }
}

const findMinNeighbor = (grid, position, start, end) => {
    const i = position[0]
    const j = position[1]

    const value = grid[i][j];

    const top = i > start ? grid[i - 1][j] : Infinity;
    const bottom = i < end ? grid[i + 1][j] : Infinity;

    return top < bottom ?
        { value: top, position: [i - 1, j], level: "top" } :
        { value: bottom, position: [i + 1, j] , level: "bottom"}
}

const findMinValue = (array,row, start, end) => {
    let minValue = { value: array[start], position: [row, start] }

    for (i = start+1; i <= end; i++){
        if (array[i] < minValue.value) minValue = { value: array[i], position: [row, i] }
    }

    return minValue
}

const isLocalMin = (grid, position, start, end) => {
    const i = position[0]
    const j = position[1]

    const value = grid[i][j];

    const top = i > start ? grid[i - 1][j] : Infinity;
    const bottom = i < end ? grid[i + 1][j] : Infinity;
    const left = j > start ? grid[i][j - 1] : Infinity;
    const right = j < end ? grid[i][j + 1] : Infinity;

    const isLocalMin =
        value < top &&
        value < bottom &&
        value < left &&
        value < right;

    if (isLocalMin) return true

    return false
}

  
const find2GridMin = (grid,start,end) => {
    let output = { value: grid[start][end], position: [start, end] }
    
    for (let i = start; i <= end; i++) {
        for (let j = start; j <= end; j++) {
            const value = grid[i][j];

            const top = i > start ? grid[i - 1][j] : Infinity;
            const bottom = i < end ? grid[i + 1][j] : Infinity;
            const left = j > start ? grid[i][j - 1] : Infinity;
            const right = j < end ? grid[i][j + 1] : Infinity;


            const isLocalMin =
                value < top &&
                value < bottom &&
                value < left &&
                value < right;

            if (isLocalMin) {
                return { value, position: [i, j] };
            }
        }
    }

    return output
}



const output = findLocallMinimum(grid)
console.log(output)