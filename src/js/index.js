// import {recipes} from '../data/data.js' 
import {createCards} from './card.js' 
import {dataCleaned, dataIds} from './cleandata.js' 
import {updateDropdownlists} from './dropdown.js'


let dataResults = dataCleaned;
let resultsIds = dataIds;


function resetDataResults() { 
    dataResults = dataCleaned; 
}

function updateDataResults() { 
    dataResults = dataResults.filter(elt=>resultsIds.includes(elt.id)); 
    createCards(dataResults);
    updateDropdownlists(dataResults);
}

function updateDataResultsWithSortByRelevance(sortedIdsArray) { 
    const resultsIdsSorted = sortedIdsArray.filter(x => resultsIds.includes(x));
    dataResults = dataResults.filter(elt=>resultsIds.includes(elt.id)); 
    dataResults = resultsIdsSorted.map((i) => dataResults.find((j) => j.id === i)); 
    createCards(dataResults);
    updateDropdownlists(dataResults);
}

function updateResultsIds(filtersResultsIds, searchResultsIds) { 
    resultsIds = filtersResultsIds.filter(element => searchResultsIds.includes(element));
}

createCards(dataResults);
updateDropdownlists(dataResults);

export{dataResults, resultsIds, updateDataResults, updateResultsIds, resetDataResults, updateDataResultsWithSortByRelevance}
