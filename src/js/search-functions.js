/**
 * Check if a string contains all the words of a searchedString
 * @param {string} string - is the string in which we are looking for the searchedString
 * @param {string} searchedString - is the string we are looking for
 * @returns {string} - is the match result
 *          "allStringMatch" (if string contains searchedString)
 *          "allWordsMatch" (if string contains all searchedWords)
 *          "mismatch" (if string not matched with searchedString)
 */
function searchInString(string, searchedString) {
  string = " " + string;
  /**
   * A blank space is add at the beginning of string and searchedString to return mismatch
   * for a string that match but with a stringMatched starting at the middle of a word
   * ex : searchedString = "MON" / string = "liMONade" => return "mismatch"
   */

  /** check if searchedString is included in string */
  if (string.includes(" " + searchedString)) {
    return "allStringMatch";
  } else {
    /** check if all SearchedWords are included in the string */
    const searchedWords = searchedString.split(" ");
    let areAllSearchedWordsInString = true;
    for (const i in searchedWords) {
      const searchedWord = searchedWords[i];
      if (!string.includes(" " + searchedWord)) {
        areAllSearchedWordsInString = false;
        break;
      }
    }
    return areAllSearchedWordsInString ? "allWordsMatch" : "mismatch";
  }
}

export { searchInString };
