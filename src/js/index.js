import {recipes} from '../data/data.js' 
import {createCard} from './card.js' 

const cardsContainer = document.getElementById('cards-container');
for (const elt of recipes) {
    const cardElement = createCard(elt);
    cardsContainer.appendChild(cardElement);
}
