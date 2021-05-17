/**
 * Create a Card on data of a recipe
 * @param {object} data - is the data of the recipe used for create a Card (data.name, data.time, data.ingredients (ingredient, quantity & unit), data.description)
 * @returns {element} cardElement - is the card element created
 */
function createCard(data) {
  const urlCardImages = "./public/images/";

  let cardElement = document.createElement("div");
  cardElement.classList.add("card-container", "col-12", "col-md-6", "col-lg-4");

  let cardDiv = document.createElement("div");
  cardDiv.classList.add("card", "mb-4", "border-0", "bg-light");
  cardElement.appendChild(cardDiv);

  let cardImage = document.createElement("img");
  cardImage.setAttribute("src", urlCardImages + "image-not-found.jpg");
  cardImage.setAttribute("alt", "Image recette");
  cardImage.classList.add("card-img-top");
  cardDiv.appendChild(cardImage);

  let cardDivTitle = document.createElement("div");
  cardDivTitle.classList.add("row", "px-3", "pt-3");
  cardDiv.appendChild(cardDivTitle);

  let cardTitle = document.createElement("span");
  cardTitle.classList.add("card-title", "col-8", "h6");
  cardTitle.textContent = data.name;
  cardDivTitle.appendChild(cardTitle);

  let cardTime = document.createElement("div");
  cardTime.classList.add(
    "receipe-time",
    "card-text",
    "col-4",
    "h6",
    "text-right"
  );
  const cardTimeContent = `
        <i class="far fa-clock"></i>
        <span>${data.time} min</span>`;
  cardTime.innerHTML = cardTimeContent;
  cardDivTitle.appendChild(cardTime);

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "row", "px-4", "py-3");
  cardDiv.appendChild(cardBody);

  let cardListIngredients = document.createElement("ul");
  cardListIngredients.classList.add("card-text", "list-unstyled", "col-6");
  cardBody.appendChild(cardListIngredients);

  for (const elt of data.ingredients) {
    let cardIngredient = document.createElement("li");
    let cardIngredientHTMLContent = `<span class="font-weight-bold">${elt.ingredient}</span>`;
    if (elt.quantity) {
      cardIngredientHTMLContent += `: <span>${elt.quantity}</span>`;
      if (elt.unit) {
        cardIngredientHTMLContent += `<span> ${elt.unit}</span>`;
      }
    }
    cardIngredient.innerHTML = cardIngredientHTMLContent;
    cardListIngredients.appendChild(cardIngredient);
  }

  if (data.description) {
    let cardDescription = document.createElement("p");
    cardDescription.classList.add("recipe-description", "card-text", "col-6");
    cardDescription.textContent =
      data.description.length > 250
        ? data.description.substring(0, 250) + "..."
        : data.description;
    cardBody.appendChild(cardDescription);
  }

  return cardElement;
}

/**
 * Create all Cards on data and add Cards elements to cardsContainer
 * @param {object} data - is the data of all recipes to create
 */
function createCards(data) {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.textContent = "";
  for (const elt of data) {
    const cardElement = createCard(elt);
    cardsContainer.appendChild(cardElement);
  }
}

export { createCards };
