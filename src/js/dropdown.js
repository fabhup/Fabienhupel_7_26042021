import {dataResults, updateDataResults, updateResultsIds, resetDataResults} from './index.js'
import {dataIds, cleanDataForSearch} from './cleandata.js' 
import {searchResultsIds} from './globalsearch.js' 
import {searchInString} from './search-functions.js' 

let filtersResultsIds = dataIds;
let activeFiltersKeys = {
    "ingredientsKeys": [],
    "ustensilsKeys": [],
    "appliancesKeys": []
}

const dropdowns = document.querySelectorAll('.dropdown');
const dropdownButtons = document.querySelectorAll('.dropdown-toggle');
const dropdownInputs = document.querySelectorAll('.dropdown-toggle > input');

 function updateDropdownlists(dataResults) {
    const dropdownMenuIngredients = document.getElementById("dropdown-menu-ingredients");
    const dropdownMenuUstensils = document.getElementById("dropdown-menu-ustensils");
    const dropdownMenuAppliances = document.getElementById("dropdown-menu-appliances");

    const dropdownIngredientsData = getDataForDropdown(dataResults, "ingredientsKeys","ingredientsListCleaned");
    const dropdownUstensilsData = getDataForDropdown(dataResults, "ustensilsKeys","ustensilsListCleaned");
    const dropdownAppliancesData = getDataForDropdown(dataResults, "appliancesKeys","appliancesListCleaned");

    const dropdownsMenus = [dropdownMenuIngredients, dropdownMenuUstensils, dropdownMenuAppliances];
    const dropdownsData = [dropdownIngredientsData, dropdownUstensilsData, dropdownAppliancesData];

    for (let i=0; i<dropdownsMenus.length; i++) {
        dropdownsMenus[i].textContent = '';  //to remove all dropdown items
        createDropdownMenu(dropdownsMenus[i],dropdownsData[i]);
    }
 }

function searchInDropdownData(dropdownType, searchedString) {
    const dropdownMenu= document.getElementById("dropdown-menu-"+dropdownType);
    const dropdownData= getDataForDropdown(dataResults, dropdownType+"Keys",dropdownType+"ListCleaned");
    searchedString = cleanDataForSearch(searchedString);
    const dropdownFiltered = Object.keys(dropdownData).filter(x => searchInString(x,searchedString)!= "mismatch").reduce((obj, key) => ({ ...obj, [key]: dropdownData[key] }), {})
    dropdownMenu.textContent = '';  //to remove all dropdown items
    createDropdownMenu(dropdownMenu,dropdownFiltered); 
}

 function createDropdownMenu(dropdownElement,dropdownData) {
        dropdownData = Object.entries(dropdownData);
        const dropdownType = dropdownElement.getAttribute("data-type")
        let listDropdown = document.createElement("ul");
        listDropdown.classList.add("list-unstyled", "d-flex","flex-wrap","p-0","mb-0");
        dropdownElement.appendChild(listDropdown);

        for (const elt of dropdownData) {
            let dropdownItem = document.createElement("li");
            dropdownItem.classList.add("dropdown-item", "col-4", "col-sm-4");  
            dropdownItem.setAttribute("data-key",elt[0]);  
            dropdownItem.textContent = elt[1];  
            dropdownItem.addEventListener("click",function() {
                addActiveFilter(dropdownType,elt[0],elt[1]);
                dropdownElement.previousElementSibling.value = "";
            });
            listDropdown.appendChild(dropdownItem);
        }
}

function addActiveFilter(typeFilter, filterKey, filterValue) {
    let activeFilterKeys = activeFiltersKeys[typeFilter+"Keys"]
    if (! activeFilterKeys.includes(filterKey)) {
        activeFilterKeys.push(filterKey)
    }
    activeFiltersKeys[typeFilter+"Keys"] = activeFilterKeys
    createFilterButton(typeFilter,filterKey,filterValue);
    updateFiltersResultsIdsOnNewKey(typeFilter,filterKey);
    updateDataResults();
  }

function removeActiveFilter(typeFilter, filterKey) {
    let activeFilterKeys = activeFiltersKeys[typeFilter+"Keys"];
    activeFilterKeys = activeFilterKeys.filter(elt => elt != filterKey)
    activeFiltersKeys[typeFilter+"Keys"] = activeFilterKeys;
    updateFiltersResultsIdsOnActiveFiltersKey();
    updateDataResults();
  }

function updateFiltersResultsIdsOnActiveFiltersKey() {
    resetDataResults();
    let data = dataResults
    if (Object.values(activeFiltersKeys).flat().length>0) {
        for (const filterKey of Object.keys(activeFiltersKeys)) {
            const activeFilterKeys = activeFiltersKeys[filterKey]
            if (activeFilterKeys.length>0) {
                data = data.filter(elt => activeFilterKeys.every(x => elt[filterKey].includes(x)))
            }
        }
        filtersResultsIds = data.map(elt => elt.id);
    }
    else {
        filtersResultsIds = dataIds;
    }
    updateResultsIds(filtersResultsIds, searchResultsIds);
}

function updateFiltersResultsIdsOnNewKey(typeFilter, filterKey) {
    filtersResultsIds = dataResults.filter(obj => obj[typeFilter+"Keys"].includes(filterKey)).map(elt => elt.id)
    updateResultsIds(filtersResultsIds, searchResultsIds);
}

const dropdownTypeClassBg = {"ingredients":"bg-info",
                             "appliances":"bg-success",  
                             "ustensils":"bg-primary"}

function createFilterButton(type, key, value) {
    const activeFiltersDiv = document.getElementById("active-filters")
    let newButton = document.createElement("button");
    newButton.classList.add("btn","text-white","m-2",`activefilter-${type}`)
    newButton.classList.add(dropdownTypeClassBg[type]);
    newButton.setAttribute("data-key",key);  
    const newButtonHTMLContent = `<span>${value} </span><i class="far fa-times-circle"></i>`;
    newButton.innerHTML = newButtonHTMLContent;
    activeFiltersDiv.appendChild(newButton);
    newButton.addEventListener("click",function() {
        removeActiveFilter(type,key);
        newButton.remove();
    })
}

/** 
 Event to hide or display searchbarPlaceholder
 */
function changePlaceholder(elt) {
    const oldPlaceholder = elt.getAttribute("placeholder");
    const oldPlaceholderArray = oldPlaceholder.split(" ");
    const ariaLabelElement = elt.getAttribute("aria-label");
    let newPlaceholder = "";

    if (oldPlaceholder == ariaLabelElement) {
        newPlaceholder = oldPlaceholderArray[oldPlaceholderArray.length - 1];
        newPlaceholder = newPlaceholder[0].toUpperCase() + newPlaceholder.slice(1);
    }
    else {
        newPlaceholder = ariaLabelElement;

    }
    elt.setAttribute("placeholder",newPlaceholder);
}

dropdownInputs.forEach(elt => elt.addEventListener("focusin",function() {
    changePlaceholder(elt);
    if (! elt.parentElement.classList.contains('show')) {
        elt.parentElement.classList.add('show');
    }
    })
)

dropdownInputs.forEach(elt => elt.addEventListener("keyup",function() {
    const dropdownType = elt.nextElementSibling.getAttribute("data-type");
    searchInDropdownData(dropdownType,elt.value)
    })
)

dropdownInputs.forEach(elt => elt.addEventListener("focusout",function() {
    changePlaceholder(elt);
    })
)

dropdownButtons.forEach(elt => elt.addEventListener("click",function() {
        if (elt.getAttribute('aria-expanded') == "false") {
        elt.firstChild.nextSibling.focus();
        elt.setAttribute('aria-expanded',"true");
        elt.parentElement.classList.add('show');
        }
    })
)

dropdowns.forEach(elt => elt.addEventListener("focusin",function() {
        dropdowns.forEach(elt => removeClassDropdownExpanded(elt))
        elt.classList.remove('col-sm-3','col-md-3');
        elt.classList.add('col-md-6');
    })
)

function removeClassDropdownExpanded(elt) {
    elt.classList.add('col-md-3');
    elt.classList.remove('col-md-6');
}

// dropdowns.forEach(elt => elt.addEventListener("focusout",function(event) {
//         event.stopPropagation();
//         elt.firstChild.nextSibling.setAttribute("aria-expanded","false");
//         // removeClassDropdownExpanded(elt);
//     })
// )

function getDataForDropdown(data, dataKeysArrayName, dataValuesArrayName) {
    const keys = data.map(item => item[dataKeysArrayName]).flat();
    const values= data.map(item => item[dataValuesArrayName]).flat();
    let dataForDropdown = {};
    for (let i=0; i<keys.length; i++) {
      const key = keys[i];
      const value = values[i];
      if (!(keys[i] in dataForDropdown)) {
        dataForDropdown[key] = value;
      }
    }
    return dataForDropdown
  }

export {getDataForDropdown, updateDropdownlists, filtersResultsIds}