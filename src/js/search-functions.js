function searchInString (string,searchedString) {
    if (searchedString === string) {
      return "exactMatch"
    }
    else if (string.includes(searchedString)) {
      return "allStringMatch"
    }
    else {
      const SearchedWords = searchedString.split(" ");
      let areAllSearchedWordsInString = true;
      for (const i in SearchedWords) {
        if (!string.includes(SearchedWords[i])) {
          areAllSearchedWordsInString = false;
          break;
        }
      }
      return areAllSearchedWordsInString ? "allWordsMatch" : "mismatch";
    }
  }
  
  function searchInArray (array,searchedString) {
    let matchResult = "mismatch";
    for (let element of array) {
      let matchElement = searchInString(element,searchedString);
      if (matchElement != 'mismatch') {
        matchResult = matchElement;
        break;
      } 
    }
    if (matchResult == "mismatch") {
      const arrayInString = array.join(" ");
      if (searchInString(arrayInString,searchedString) != 'mismatch') {
        matchResult = "partialMatch"
      } 
      
    }
    return matchResult 
  }

  export {searchInString, searchInArray}