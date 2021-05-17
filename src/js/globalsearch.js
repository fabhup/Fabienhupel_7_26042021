import { cleanDataForSearch, dataIds } from "./cleandata.js";
import { areWordsInString } from "./search-functions.js";
import {
  updateDataResults,
  updateResultsIds,
  resetDataResults,
  updateDataResultsWithSortByRelevance,
} from "./index.js";
import { filtersResultsIds } from "./dropdown.js";

/** Initialize variables */
let searchResultsIds = dataIds;

/**
 * Global Search function to select recipes with searchedString found in Name, Ingredients or Description
 *  1) searchedString is cleaned with cleanDataForSearch()
 *  2) data is filtered and results are stored in listMatchItem
 *      a) look for searchedString in "nameForSearch"
 *      b) if not find, look for searchedString in "ingredientsListForSearch"
 *      c) if not find, look for searchedString in "allDataForSearch"
 *         -> allDataForSearch = nameForSearch + ingredientsListForSearch + descriptionForSearch
 *  3) listMatchItem is sorted by relevance in searchResultsIds
 *      => sortOrder : 1 if find in Name, 2 if find in Ingredients else 3
 *  4) updateResultsIds => keep only results which are also in filtersResultsIds (results of dropdown selections)
 *  5) updateDataResultsWithSortByRelevance => update DataResults to createCards and updateDropdownlists
 * @param {object} data - is the data to analyse ({id: ..., nameForSearch: "...", ingredientsListForSearch: ["...","...",...], data.allDataForSearch: "..."})
 * @param {string} searchedString - is the string we are looking for in data.nameForSearch, data.ingredientsListForSearch, data.allDataForSearch
 */

function globalSearch(data, searchedString) {
  const searchedWords = cleanDataForSearch(searchedString).split(" ");
  let listMatchItem = [];
  data.filter(function (item) {
    if (areWordsInString(item.nameForSearch, searchedWords)) {
      listMatchItem.push({
        id: item.id,
        name: item.name,
        matchType: "name",
        sortOrder: 1,
      });
      return true;
    } else if (
      areWordsInString(item.ingredientsListForSearch.join(" "), searchedWords)
    ) {
      listMatchItem.push({
        id: item.id,
        name: item.name,
        matchType: "ingredients",
        sortOrder: 2,
      });
      return true;
    } else if (areWordsInString(item.allDataForSearch, searchedWords)) {
      listMatchItem.push({
        id: item.id,
        name: item.name,
        matchType: "description",
        sortOrder: 3,
      });
      return true;
    } else {
      return false;
    }
  });
  const searchResultsIds = listMatchItem
    .sort(function (a, b) {
      return a.sortOrder - b.sortOrder;
    })
    .map((elt) => elt.id); //sortItems by sortOrder to priorize results by relevance
  updateResultsIds(filtersResultsIds, searchResultsIds);
  updateDataResultsWithSortByRelevance(searchResultsIds);
}

function resetGlobalSearch() {
  resetDataResults();
  searchResultsIds = dataIds;
  updateResultsIds(filtersResultsIds, searchResultsIds);
  updateDataResults();
}

export { globalSearch, searchResultsIds, resetGlobalSearch };
