import { cleanDataForSearch, dataIds } from "./cleandata.js";
import { searchInString } from "./search-functions.js";
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
  let listMatchItem = [];
  searchedString = cleanDataForSearch(searchedString);
  data.filter(function (item) {
    if (searchInString(item.nameForSearch, searchedString) != "mismatch") {
      listMatchItem.push({
        id: item.id,
        matchType: "name",
        sortOrder: 1,
      });
      return true;
    } else if (
      searchInString(item.ingredientsListForSearch.join(" "), searchedString) !=
      "mismatch"
    ) {
      listMatchItem.push({
        id: item.id,
        matchType: "ingredients",
        sortOrder: 2,
      });
      return true;
    } else if (
      searchInString(item.allDataForSearch, searchedString) != "mismatch"
    ) {
      listMatchItem.push({
        id: item.id,
        matchType: "description",
        sortOrder: 3,
      });
      return true;
    } else {
      return false;
    }
  });
  /** sortItems by sortOrder to priorize results by relevance */
  searchResultsIds = listMatchItem
    .sort(function (a, b) {
      return a.sortOrder - b.sortOrder;
    })
    .map((elt) => elt.id);
  /** update resultsIds as intersection of searchResultsIds and filtersResultsIds */
  updateResultsIds(filtersResultsIds, searchResultsIds);
  /** update DataResults to createCards and updateDropdownlists with sort by Relevance */
  updateDataResultsWithSortByRelevance(searchResultsIds);
}

/**
 * Reinitialize searchResultsIds with dataIds and update results (on filtersResultsIds if there is active filters)
 */
function resetGlobalSearch() {
  resetDataResults();
  searchResultsIds = dataIds;
  updateResultsIds(filtersResultsIds, searchResultsIds);
  updateDataResults();
}

export { globalSearch, searchResultsIds, resetGlobalSearch };
