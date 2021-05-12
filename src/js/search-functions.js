
/**
 * Merge two sorted arrays to return one sorted newArray 
 * @param {array} a 
 * @param {array} b 
 * @return {array} newArray 
 */
function mergeArrays(a, b) {
  const newArray = []
  while (a.length && b.length) {
    newArray.push(a[0] > b[0] ? b.shift() : a.shift())
  }
  //if there is always values in an array the end of `newArray`
  if (a.length) {
    newArray.push(...a);   
  }
  if (b.length) {
    newArray.push(...b);   
  } 
  return newArray
}

/**
 * Sort an array with a merge sort algorithm (values are sorted 2 by 2 and then each arrays are merged) 
 * @param {array} array 
 * @return {array} 
 */
function mergeSort(array) {
  if (array.length < 2) {
    return array
  }
  const middle = Math.floor(array.length / 2)
  const left = array.slice(0, middle)
  const right = array.slice(middle, array.length)
  const leftSorted = mergeSort(left)
  const rightSorted = mergeSort(right)
  return mergeArrays(leftSorted, rightSorted)
}

/**
 * Check if a value is present in an array
 * @param {array} array
 * @param {string} searchedValue 
 * @return {binary} true if searchedValue is in the array (else false) 
 */
function searchInSortedArray(array,searchedValue) {
  const lastElementToCompare = array.slice(-1)[0].substr(0,searchedValue.length);
  const firstElementToCompare = array[0].substr(0,searchedValue.length);

  if (searchedValue == firstElementToCompare || searchedValue == lastElementToCompare) {
    return true
  }
  else if (searchedValue < firstElementToCompare || searchedValue > lastElementToCompare || array.length<3) {
    return false
  }
  else {
    const middleIndex = Math.floor(array.length/2)
    const middleElementToCompare = array[middleIndex].substr(0,searchedValue.length);
    if (searchedValue == middleElementToCompare) {
      return true
    }
    else if (searchedValue < middleElementToCompare) {
      return searchInSortedArray(array.slice(0, middleIndex), searchedValue)
    }
    else if (searchedValue > middleElementToCompare) {
      return searchInSortedArray(array.slice(middleIndex+1, array.length), searchedValue)
    }
  }
} 

/**
 * Check if a string contains all searchedWords 
 * @param {string} string
 * @param {array} searchedWords 
 * @return {binary} true if all words are in the string (else false) 
 */
function areWordsInString (string,searchedWords) {
  const array = string.split(" ")
  const searchedWordsSorted = mergeSort(searchedWords);
  const arraySorted = mergeSort(array);
  for (const word of searchedWordsSorted) {
    const isWordInArray = searchInSortedArray(arraySorted,word);
    if (!isWordInArray) {
      return false
    }
  }
  return true
}

/**
 * Check if an array contains all searchedWords 
 * @param {array} array
 * @param {array} searchedWords 
 * @return {binary} true if all words are in the array (else false) 
 */
function areWordsInArray (array,searchedWords) {
  const searchedWordsSorted = mergeSort(searchedWords);
  const arraySorted = mergeSort(array);
  for (const word of searchedWordsSorted) {
    const isWordInArray = searchInSortedArray(arraySorted,word);
    if (!isWordInArray) {
      return false
    }
  }
  return true
}
  
export {areWordsInString,areWordsInArray}