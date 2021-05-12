import {cleanDataForSearch, dataIds} from './cleandata.js' 
import {areWordsInString} from './search-functions.js' 
import {updateDataResults, updateResultsIds, resetDataResults, updateDataResultsWithSortByRelevance} from './index.js'
import {filtersResultsIds} from './dropdown.js'

let searchResultsIds = dataIds;

/**
 * Global Search function to select recipes with searchedString in Name, Ingredients or Description
 *  1) searchedString is cleaned
 *  2) data is filtered
 *      a) search all words of searchedString in "nameForSearch"
 *      b) if not find, search all words of searchedString in "ingredientsListForSearch"
 *      c) if not find, search all words of searchedString in "allDataForSearch"
 *         -> allDataForSearch = nameForSearch + ingredientsListForSearch + descriptionForSearch
 *  3) results are sorted by relevance => sortOrder : 1 if find in Name, 2 if find in Ingredients else 3
 *  4) updateResultsIds => keep only results which are also in filtersResultsIds (results of dropdown selections)
 *  5) updateDataResultsWithSortByRelevance => update DataResults to createCards and updateDropdownlists 
 * @param {object} data 
 * @param {string} searchedString
 */
function globalSearch(data,searchedString) {
    const searchedWords = cleanDataForSearch(searchedString).split(" ");
    let listMatchItem = [];
    data.filter(function(item) {
        if (areWordsInString(item.nameForSearch,searchedWords)) {
            listMatchItem.push({"id": item.id, "name": item.name, "matchType": "name", "sortOrder":1})
            return true
            }
        else if (areWordsInString(item.ingredientsListForSearch.join(" "),searchedWords)) {
            listMatchItem.push({"id": item.id, "name": item.name, "matchType": "ingredients", "sortOrder":2})
            return true
            }
        else if (areWordsInString(item.allDataForSearch,searchedWords)) {
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
