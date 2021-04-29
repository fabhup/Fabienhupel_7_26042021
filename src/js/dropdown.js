
const dropdowns = document.querySelectorAll('.dropdown');
const dropdownButtons = document.querySelectorAll('.dropdown-toggle');
const dropdownInputs = document.querySelectorAll('.dropdown-toggle > input');

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
        else {
            console.log(1);
        }
    })
)

dropdowns.forEach(elt => elt.addEventListener("focusin",function() {
        console.log("open dropdown");
        elt.classList.remove('col-sm-3');
        elt.classList.remove('col-md-3');
        elt.classList.add('col-md-6');
    })
)

function removeClassDropdownExpanded(elt) {
    elt.classList.add('col-md-3');
    elt.classList.remove('col-md-6');
}

dropdowns.forEach(elt => elt.addEventListener("focusout",function() {
        // elt.firstChild.nextSibling.setAttribute("aria-expanded","false");
        removeClassDropdownExpanded(elt);
    })
)

