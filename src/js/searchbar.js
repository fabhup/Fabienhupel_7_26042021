
import {globalSearch, resetGlobalSearch} from './globalsearch.js' 
import {dataCleaned} from './cleandata.js' 
import {resetDataResults} from './index.js'

const searchbarPlaceholder = document.getElementById('searchbar--placeholder');
const searchbarInput = document.getElementById('searchbar');

/** 
 Event to hide or display searchbarPlaceholder
 */
let newValue='';
let oldValue='';

searchbarInput.addEventListener("input",function() {
    if (searchbarInput.value) {
        searchbarPlaceholder.style.display = "none";
    }
    else {
        searchbarPlaceholder.style.display = "block";
    }
})

searchbarInput.addEventListener("keyup",function() {
    newValue = searchbarInput.value
        if (searchbarInput.value.length>2 && oldValue.length < newValue.length) {
            globalSearch(dataCleaned,searchbarInput.value);
        }
        else if (searchbarInput.value.length>2) {
            resetDataResults();
            globalSearch(dataCleaned,searchbarInput.value);
        }
        else {
            resetGlobalSearch();
        }
    oldValue = newValue
})

searchbarInput.addEventListener("search",function() {
    if (! searchbarInput.value) {
        resetGlobalSearch();
    }
})


