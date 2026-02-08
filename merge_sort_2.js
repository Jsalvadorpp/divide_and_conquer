const input = [6, 2, 8, 3]

const mergeSort = (array,start=0,end=array.length-1) => {
  const len = end - start + 1
  if(len == 1) return array

  const half = Math.floor((end+start)/2)

  mergeSort(array,start,half)
  mergeSort(array,half+1,end)

  const mergeArray = merge(array,start,half,end)
  return mergeArray
}

const merge = (array,start,half,end) => {
  let mergedArray = []

  let i = start
  let j = half+1


  while(i <= half && j <= end){
    const leftValue = array[i]
    const rightValue = array[j]

    if(leftValue<rightValue){
      mergedArray.push(leftValue)
      i++
    }else{
      mergedArray.push(rightValue)
      j++
    }
  }

  while(i <= half){
    mergedArray.push(array[i])
    i++
  }

  while(j <= end){
    mergedArray.push(array[j])
    j++
  }


  for(let k = 0; k < mergedArray.length; k++){
    array[start+k] = mergedArray[k]
  }
  
  return array
}


const result = mergeSort(input)
console.log(result)