// ============================================================
// CONTROLLER: Indkøbskurv (cartController.js)
// ------------------------------------------------------------
// Controlleren binder model og view sammen.
// Den lytter efter klik, beder modellen om at ændre data,
// og beder derefter viewet om at vise de nye data.
//
// Funktionerne der starter med "handle" er callbacks:
// vi kalder dem ikke selv - browseren kalder dem, når brugeren klikker.
// ============================================================

// Hent funktionerne fra modellerne (data)
import {
    getCart,
    addToCart,
    removeFromCart,
    changeQuantity,
    clearCart,
    getTotal,
    getItemCount
} from './cardModel.js';
import { getProducts, getProductById } from './productModel.js';

// Hent funktionerne fra viewet (HTML)
import {
    renderLayout,
    renderProducts,
    renderCart,
    renderCartCount
} from './cartView.js';

// ------------------------------------------------------------
// Starter indkøbskurven. Kaldes en gang fra site.js.
// ------------------------------------------------------------
export function initCart() {
    // Byg sidens ramme og vis produkterne
    renderLayout();
    renderProducts(getProducts());

    // Sæt klik på alle "Læg i kurv" knapper
    addClickCallback('.add-button', handleAddClick);

    // Vis kurven som den ligger gemt i localStorage
    updateCart();
}

// ------------------------------------------------------------
// Viser kurven igen med de nyeste data fra modellen.
// Kaldes hver gang kurven er blevet ændret.
// ------------------------------------------------------------
function updateCart() {
    renderCart(getCart(), getTotal());
    renderCartCount(getItemCount());

    // Viewet laver helt nye knapper hver gang kurven vises,
    // så klik skal sættes på dem igen
    addClickCallback('.plus-button', handlePlusClick);
    addClickCallback('.minus-button', handleMinusClick);
    addClickCallback('.remove-button', handleRemoveClick);
    addClickCallback('#clear-button', handleClearClick);
}

// ------------------------------------------------------------
// Hjælpefunktion: sætter en callback på alle elementer der
// passer til selectoren.
// selector er en CSS selector, f.eks. '.add-button'.
// callback er den funktion der skal køre ved klik.
// ------------------------------------------------------------
function addClickCallback(selector, callback) {
    // querySelectorAll finder ALLE elementer der passer (ikke kun det første)
    const buttons = document.querySelectorAll(selector);

    for (const button of buttons) {
        // Vi skriver callback uden () - så giver vi selve funktionen videre
        // i stedet for at køre den med det samme
        button.addEventListener('click', callback);
    }
}

// ------------------------------------------------------------
// Hjælpefunktion: finder id'et på den knap der blev klikket på.
// ------------------------------------------------------------
function getIdFromEvent(event) {
    // event.target er det element der blev klikket på (knappen)
    // dataset.id læser værdien fra data-id i HTML'en
    // Number laver teksten "2" om til tallet 2, så det passer med id i modellen
    return Number(event.target.dataset.id);
}

// ============================================================
// CALLBACKS
// ============================================================

// Kører når der klikkes på "Læg i kurv"
function handleAddClick(event) {
    const id = getIdFromEvent(event);

    // Find hele produktet ud fra id'et og læg det i kurven
    const product = getProductById(id);
    addToCart(product);

    updateCart();
}

// Kører når der klikkes på "+" (en mere af varen)
function handlePlusClick(event) {
    const id = getIdFromEvent(event);
    changeQuantity(id, 1);
    updateCart();
}

// Kører når der klikkes på "-" (en mindre af varen)
function handleMinusClick(event) {
    const id = getIdFromEvent(event);
    changeQuantity(id, -1);
    updateCart();
}

// Kører når der klikkes på "Fjern"
function handleRemoveClick(event) {
    const id = getIdFromEvent(event);
    removeFromCart(id);
    updateCart();
}

// Kører når der klikkes på "Tøm kurv"
function handleClearClick() {
    clearCart();
    updateCart();
}
