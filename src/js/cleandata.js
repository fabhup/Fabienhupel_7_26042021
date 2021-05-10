  import {recipes} from '../data/data.js' 
  import {stopWordsList} from '../data/stopwords.js' 


  function replaceAccentsInString(string) {
      const regexAccents = [
          /[\300-\306]/g, /[\340-\346]/g, // A, a
          /[\310-\313]/g, /[\350-\353]/g, // E, e
          /[\314-\317]/g, /[\354-\357]/g, // I, i
          /[\322-\330]/g, /[\362-\370]/g, // O, o
          /[\331-\334]/g, /[\371-\374]/g, // U, u
          /[\321]/g, /[\361]/g, // N, n
          /[\307]/g, /[\347]/g, // C, c
      ];
      const lettersWithoutAccents = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
       
      for(var i = 0; i < regexAccents.length; i++){
          string = string.replace(regexAccents[i], lettersWithoutAccents[i]);
      }
    
      return string;
  }
  
  function keepOnlyLettersInString(string) {
      return string.replace(/[^a-zA-ZÀ-ÿ' ]/g, '');   //regex to keep only characters included accented characters
  }
   
//   function sortArrayWithAccents(array) {
//     return array.sort(function (a, b) {
//       return a.localeCompare(b); //to have a sort order with accents
//     })
//   }
  
  function capitalizeFirstLetter (string) {
    return string[0].toUpperCase() + string.substring(1)
  }
  
  function removeTextBetweenParenthesis (string) {
    return string.replace(/\s*\(.*?\)\s*/g, '');
  }
  
  function removeLastCharacterIfMatch (string, matchCharactersArray) {
    const stringWords = string.split(" ");
    stringWords.forEach(function(word, index) {
      stringWords[index] = matchCharactersArray.includes(word.slice(-1)) ? word.slice(0, -1) : word
    })
    return stringWords.join(" ")
  }
  
  function removeShortWords (string, minLengthWord, wordsToExclude) {
    let stringWords = string.split(" ");
    stringWords = stringWords.filter(function(word){ 
          return (word.length >= minLengthWord && !wordsToExclude.includes(word));
      });
    return stringWords.join(" ")
  }
  
  function removeTextAfterMatchStrings (string, matchStringsArray) {
    for (const matchString of matchStringsArray) {
      let indexMatchString = string.indexOf(matchString)
      if (indexMatchString>=0) {
        string = string.substring(0,indexMatchString)
      } 
    }
    return string
  }
  
  function removeMatchStrings(string,arrayMatchString) {
    for(const matchString of arrayMatchString) {
      string = string.replace(matchString,'')
    }
    return string
  }
  
  function cleanDataForDropdown(string) {
    string = removeTextBetweenParenthesis(string); //remove text in parenthesis ex : Thon Rouge (ou blanc) -> Thon Rouge
    string = keepOnlyLettersInString(string);   //regex to keep only characters included accented characters
    string = capitalizeFirstLetter(string);
    string = removeMatchStrings(string,["de matière grasse"]);
    string = removeTextAfterMatchStrings(string,[" ou "]);
    return string.trim()  //replace blank spaces at the begining and the end of the string 
  }
  
  function cleanDataForSearch(string) {
    string = keepOnlyLettersInString(string); 
    string = uniformizedKeys(string);   //regex to keep only characters included accented characters
    return string.trim()  //replace blank spaces at the begining and the end of the string 
  }
  
  function uniformizedKeys(string) {
    string = string.toLowerCase(); //to lowerCase accents to uniformized same ingredients
    string = string.replace("'"," ");
    string = string.length>3 ? removeShortWords(string,3,stopWordsList) : string //remove small words 1 or 2 characters
    string = replaceAccentsInString(string); //replace accents to uniformized same ingredients
    string = removeLastCharacterIfMatch(string,["s","x"])  //replace "s" & "x" at the end of string to uniformized (plural and singular words) 
    return string.trim()
  }
  
  const dataCleaned = (recipes.map(x => (
    {id: x.id,
     name: capitalizeFirstLetter(x.name), 
     ingredients: x.ingredients,
     time: x.time,
     description: x.description,
     ingredientsList: x.ingredients.map(x => x.ingredient),
     ustensilsList: Array.isArray(x.ustensils) ? x.ustensils : x.ustensils.split(),
     appliancesList: Array.isArray(x.appliance) ? x.appliance : x.appliance.split(),
    })))
  
    dataCleaned.forEach(function (element) {
    element.ingredientsListCleaned =  element.ingredientsList.map(x => cleanDataForDropdown(x)),
    element.ingredientsKeys = element.ingredientsListCleaned.map(x => uniformizedKeys(x));
    element.ustensilsListCleaned =  element.ustensilsList.map(x => cleanDataForDropdown(x)),
    element.ustensilsKeys = element.ustensilsListCleaned.map(x => uniformizedKeys(x));
    element.appliancesListCleaned =  element.appliancesList.map(x => cleanDataForDropdown(x)),
    element.appliancesKeys = element.appliancesListCleaned.map(x => uniformizedKeys(x));
    element.nameForSearch = cleanDataForSearch(element.name);
    element.ingredientsListForSearch = element.ingredientsList.map(x => cleanDataForSearch(x));
    element.descriptionForSearch = cleanDataForSearch(element.description);
    element.allDataForSearch = element.nameForSearch + " " + element.ingredientsListForSearch.join(" ") + " " + element.descriptionForSearch;
  });

  const dataIds = dataCleaned.map(elt => elt.id);

  export {dataCleaned, dataIds, cleanDataForSearch}

//   const replaceDictionnary = [
//     { key: "% de matière grasse", value: "% MG"},
//     { key: "grammes", value: "g"},
//     { key: "gramme", value: "g"},
//     { key: "kilogramme", value: "kg"},
//     { key: "kilogrammes", value: "kg"},             
//   ]
//   listIngredientsWithDoublons = [...new Set(sortArrayWithAccents(json2.map(item => item.ingredientsList).flat()))];
//   ingredientsList = json2json2.map(item => item.ingredientsList).flat();
//   console.log([...new Set(jsonModified.map(item => item.ingredientsKeys).flat().sort())]);
  