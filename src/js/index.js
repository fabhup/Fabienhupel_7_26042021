import { createCards } from "./card.js";
import { dataCleaned, dataIds } from "./cleandata.js";
import { updateDropdownlists } from "./dropdown.js";

let dataResults = dataCleaned;
let resultsIds = dataIds;

/**
 * Reinitialize dataResults with dataCleaned
 */
function resetDataResults() {
  dataResults = dataCleaned;
}

/**
 * Update dataResults on resultsIds, createCards and updateDropdownLists
 */
function updateDataResults() {
  dataResults = dataResults.filter((elt) => resultsIds.includes(elt.id));
  createCards(dataResults);
  updateDropdownlists(dataResults);
}

/**
 * Update dataResults on resultsIds (with sort by sortedIdsArray), createCards and updateDropdownLists
 */
function updateDataResultsWithSortByRelevance(sortedIdsArray) {
  const resultsIdsSorted = sortedIdsArray.filter((x) => resultsIds.includes(x));
  dataResults = dataResults.filter((elt) => resultsIds.includes(elt.id));
  dataResults = resultsIdsSorted.map((i) =>
    dataResults.find((j) => j.id === i)
  );
  createCards(dataResults);
  updateDropdownlists(dataResults);
}

/**
 * Update resultsIds as intersection of searchResultsIds and filtersResultsIds
 */
function updateResultsIds(filtersResultsIds, searchResultsIds) {
  resultsIds = filtersResultsIds.filter((element) =>
    searchResultsIds.includes(element)
  );
}

/** Initialize Cards and DropdownLists on dataCleaned*/
createCards(dataCleaned);
updateDropdownlists(dataCleaned);

export {
  dataResults,
  resultsIds,
  updateDataResults,
  updateResultsIds,
  resetDataResults,
  updateDataResultsWithSortByRelevance,
};