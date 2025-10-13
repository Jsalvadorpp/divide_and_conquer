//const pairPoints = [[3, 4], [1, 1], [4, 2], [2, 5]]
//const pairPoints = [[0, 0], [5, 4], [3, 1], [1, 1], [7, 7]]
const pairPoints = [[2, 3],[12, 30],[40, 50],[5, 1],[12, 10],[3, 4],[7, 2],[20, 21]]


const sortPoints = (pointsArray, sortByAxis = "x") => {
    let sortByPosition

    if (sortByAxis == "x") sortByPosition = 0
    if (sortByAxis == "y") sortByPosition = 1

    if (pointsArray.length <= 1) return pointsArray

    let arrayHalf = Math.floor(pointsArray.length / 2)
    
    let leftArray = pointsArray.slice(0, arrayHalf)
    let rightArray = pointsArray.slice(arrayHalf, pointsArray.length)

    const sortedPoints1 = sortPoints(leftArray, sortByAxis)
    const sortedPoints2 = sortPoints(rightArray, sortByAxis)


    const sortedMergedPoints = merge(sortedPoints1, sortedPoints2, sortByPosition)
    return sortedMergedPoints
}

const merge = (array1, array2, sortByPosition) => {
    const sortedPoints = []
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

    return sortedPoints 
}


const closestPair = (pointsArray) => {
    // base cases
    if (pointsArray.length == 1) return 0
    if (pointsArray.length == 2) return distance(pointsArray[0], pointsArray[1])
    if (pointsArray.length == 3) return Math.min(
        distance(pointsArray[0], pointsArray[1]),
        distance(pointsArray[0], pointsArray[2]),
        distance(pointsArray[1], pointsArray[2])
    )

    const halfArray = Math.floor(pointsArray.length/2)
    const xSorted = sortPoints(pointsArray, "x")

    const leftPoints = xSorted.slice(0, halfArray)
    const rightPoints = xSorted.slice(halfArray, xSorted.length)
    const midPoint = (leftPoints[leftPoints.length-1][0] + rightPoints[0][0])/2  // (last leftPx + first rightPx)/2
    
    const distanceLeft = closestPair(leftPoints)
    const distanceRight = closestPair(rightPoints)


    let minDistance = Math.min(distanceLeft, distanceRight)
    minDistance = closestPairStrip(minDistance, midPoint, xSorted)

    return minDistance.toFixed(2)
}

const closestPairStrip = (d,midPoint,pointsArray) => {
    let minD = d

    const strip = []

    pointsArray.forEach(point => {
        if (midPoint - d < point[0] && point[0] < midPoint + d) {
            strip.push(point)
        }
    })

    const ySortedStrip = sortPoints(strip, "y")
    const maxPoints = 7

    for (let k = 0; k < ySortedStrip.length; k++){
        for (let i = 1; i <= maxPoints; i++) {
            const p1 = ySortedStrip[k]
            const p2 = ySortedStrip[k + i]
        
            if (!p2) break;
            if (distance(p1, p2) < minD) {
                minD = distance(p1, p2)
            }
        }
    }


    return minD
}

function distance(p1, p2) {
    const dx = p2[0] - p1[0]
    const dy = p2[1] - p1[1]
    return Math.sqrt(dx * dx + dy * dy)
}



const input = pairPoints
const output = closestPair(pairPoints)

console.log(output)


