import { globalSearch, resetGlobalSearch } from "./globalsearch.js";
import { resetDataResults, dataResults } from "./index.js";

const searchbarPlaceholder = document.getElementById("searchbar--placeholder");
const searchbarInput = document.getElementById("searchbar");

/** 
 Event to hide or display searchbarPlaceholder
 */
let newValue = "";
let oldValue = "";

searchbarInput.addEventListener("input", function () {
  if (searchbarInput.value) {
    searchbarPlaceholder.style.display = "none";
  } else {
    searchbarPlaceholder.style.display = "block";
  }
});

/**
 * Event to launch Global Search or reinitialize it
 */
searchbarInput.addEventListener("keyup", function () {
  newValue = searchbarInput.value;
  /** launch globaSearch if 3 characters are typed in the searchbar and if the key pressed add a new character */
  if (searchbarInput.value.length > 2 && oldValue.length < newValue.length) {
    globalSearch(dataResults, searchbarInput.value);
  } else if (searchbarInput.value.length > 2) {
  /** launch globaSearch if 3 characters are typed in the searchbar and reinitialize results */
    resetDataResults();
    globalSearch(dataResults, searchbarInput.value);
  } else {
    resetGlobalSearch();
  }
  oldValue = newValue;
});

/**
 * Event to reinitialize Global Search if input.value is not defined
 */
searchbarInput.addEventListener("search", function () {
  if (!searchbarInput.value) {
    resetGlobalSearch();
  }
});
