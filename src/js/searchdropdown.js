
const searchbarPlaceholder = document.getElementById('searchbar--placeholder');
const searchbarInput = document.getElementById('searchbar');

/** 
 Event to hide or display searchbarPlaceholder
 */
searchbarInput.addEventListener("input",function() {
    if (searchbarInput.value) {
        searchbarPlaceholder.style.display = "none";
    }
    else {
        searchbarPlaceholder.style.display = "block";

    }
})