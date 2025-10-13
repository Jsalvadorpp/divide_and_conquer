//You are given as input an unsorted array of n distinct numbers, 
//where n is a power of 2. Give an algorithm that identifies the second - largest number in the array, 
//and that uses at most n+log2​n−2 comparisons


//const input = [18, 5, 42, 11, 29, 33, 7, 26]
//const input = [50, 20, 45, 40, 35, 33, 30, 25];
const input = [50, 20, 45, 48];


//find second largest number
const tournament = (array) => {
    if (array.length == 2) return array[0] > array[1] ? 
        { winner: array[0], runnerUp: array[1] }:
        { winner: array[1], runnerUp: array[0] }

    const halfArray = array.length / 2
    
    const leftHalf = array.slice(0, halfArray)
    const rightHalf = array.slice(halfArray, array.length)

    const { winner: leftWinner , runnerUp: leftRunnerUp } = tournament(leftHalf)
    const { winner: rightWinner, runnerUp: rightRunnerUp }  = tournament(rightHalf)

    const { winner, runnerUp } = compete(leftWinner, leftRunnerUp,rightWinner,rightRunnerUp)

    return { winner, runnerUp }
}

const compete = (leftWinner, leftRunnerUp, rightWinner, rightRunnerUp) => {
    let winner 
    let runnerUp
    
    if (leftWinner > rightWinner){
        winner = leftWinner
        runnerUp = rightWinner > leftRunnerUp ? rightWinner : leftRunnerUp
    } else {
        winner = rightWinner
        runnerUp = leftWinner > rightRunnerUp ? leftWinner : rightRunnerUp
    }

    return { winner, runnerUp}
}

const output = tournament(input)
console.log(output)

