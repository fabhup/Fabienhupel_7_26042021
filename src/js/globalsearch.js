import {cleanDataForSearch, dataIds} from './cleandata.js' 
import {searchInString, searchInArray} from './search-functions.js' 
import {updateDataResults, updateResultsIds, resetDataResults, updateDataResultsWithSortByRelevance} from './index.js'
import {filtersResultsIds} from './dropdown.js'

// searchedString = "chocolat";
/*console.log(json2.filter(d=>searchInArray(d.ingredientsList,search)));*/

let searchResultsIds = dataIds;

function globalSearch(data,searchedString) {
    searchedString = cleanDataForSearch(searchedString);
    let listMatchItem = [];
    data.filter(function(item) {
        if (searchInString(item.nameForSearch,searchedString) != "mismatch") {
            listMatchItem.push({"id": item.id, "name": item.name, "matchType": "name", "sortOrder":1})
            return true
            }
        else if (searchInArray(item.ingredientsListForSearch,searchedString) != "mismatch") {
            listMatchItem.push({"id": item.id, "name": item.name, "matchType": "ingredients", "sortOrder":2})
            return true
            }
        else if (searchInString(item.allDataForSearch,searchedString) != "mismatch") {
            listMatchItem.push({"id": item.id, "name": item.name, "matchType": "description", "sortOrder":3})
            return true
            }
        else {
            return false
        }
    });
    const searchResultsIdsOrdered = listMatchItem.sort(function (a, b) {
        return a.sortOrder - b.sortOrder;
    }).map(elt => elt.id) //sortItems by sortOrder to priorize results by relevance
    updateResultsIds(filtersResultsIds, searchResultsIdsOrdered);
    updateDataResultsWithSortByRelevance(searchResultsIdsOrdered);
}

function resetGlobalSearch() {
    resetDataResults();
    searchResultsIds = dataIds;
    updateResultsIds(filtersResultsIds, searchResultsIds);
    updateDataResults();
}

export {globalSearch, searchResultsIds, resetGlobalSearch}
// console.log(listMatchItem)  
//   console.log(filterDataWithDropdown(jsonResults,"ingredientsKeys","banane"));
//   console.log(filterDataWithDropdown(jsonResults,"ingredientsKeys","banane"));
//   console.log(filterDataWithDropdown(dataDropdownIngredients,"ingredientsKeys","banane"));