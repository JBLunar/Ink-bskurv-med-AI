// ============================================================
// MODEL: Indkøbskurv (cart.model.js)
// ------------------------------------------------------------
// Modellen har ansvaret for DATA.
// Den ved intet om HTML eller om hvordan siden ser ud.
// Den læser og gemmer kurven i localStorage.
// ============================================================

// Nøglen (navnet) som kurven bliver gemt under i localStorage
const STORAGE_KEY = 'cart';

// ------------------------------------------------------------
// Henter kurven fra localStorage.
// Returnerer et array med varer. Er der ikke gemt noget endnu,
// får vi et tomt array tilbage.
// ------------------------------------------------------------
export function getCart() {
    // localStorage kan kun gemme tekst, så vi får en tekststreng (eller null)
    const savedCart = localStorage.getItem(STORAGE_KEY);

    // null betyder at der ikke er gemt noget endnu - så starter vi med en tom kurv
    if (savedCart === null) {
        return [];
    }

    // JSON.parse laver teksten om til et rigtigt array igen
    return JSON.parse(savedCart);
}

// ------------------------------------------------------------
// Gemmer kurven i localStorage.
// Funktionen har ikke "export", fordi den kun bruges her i modellen.
// ------------------------------------------------------------
function saveCart(cart) {
    // JSON.stringify laver arrayet om til tekst, så localStorage kan gemme det
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

// ------------------------------------------------------------
// Lægger et produkt i kurven.
// Findes produktet allerede, tæller vi antallet 1 op i stedet
// for at tilføje det en gang til.
// ------------------------------------------------------------
export function addToCart(product) {
    // Hent den nuværende kurv
    const cart = getCart();

    // Led efter en vare i kurven med samme id som produktet
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
        // Varen findes allerede - læg 1 til antallet
        existingItem.quantity = existingItem.quantity + 1;
    } else {
        // Varen findes ikke - tilføj den som en ny vare med antal 1
        // Vi gemmer kun de oplysninger kurven har brug for
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1
        });
    }

    // Gem den opdaterede kurv
    saveCart(cart);
}

// ------------------------------------------------------------
// Fjerner en vare helt fra kurven ud fra varens id.
// ------------------------------------------------------------
export function removeFromCart(id) {
    const cart = getCart();

    // filter laver et nyt array med alle varer UNDTAGEN den med det valgte id
    const updatedCart = cart.filter((item) => item.id !== id);

    saveCart(updatedCart);
}

// ------------------------------------------------------------
// Ændrer antallet af en vare.
// amount er +1 (en mere) eller -1 (en mindre).
// Kommer antallet ned på 0, bliver varen fjernet fra kurven.
// ------------------------------------------------------------
export function changeQuantity(id, amount) {
    const cart = getCart();

    // Find varen der skal ændres
    const item = cart.find((item) => item.id === id);

    // Findes varen ikke i kurven, stopper vi funktionen her
    if (!item) {
        return;
    }

    // Læg amount til antallet (-1 trækker en fra)
    item.quantity = item.quantity + amount;

    if (item.quantity <= 0) {
        // Ingen tilbage af varen - fjern den helt
        removeFromCart(id);
    } else {
        // Ellers gem kurven med det nye antal
        saveCart(cart);
    }
}

// ------------------------------------------------------------
// Tømmer hele kurven.
// ------------------------------------------------------------
export function clearCart() {
    // Sletter det gemte under vores nøgle i localStorage
    localStorage.removeItem(STORAGE_KEY);
}

// ------------------------------------------------------------
// Udregner den samlede pris for alle varer i kurven.
// ------------------------------------------------------------
export function getTotal() {
    const cart = getCart();

    // Vi starter på 0 og lægger hver vares pris til
    let total = 0;

    for (const item of cart) {
        // pris gange antal for den enkelte vare
        total = total + item.price * item.quantity;
    }

    return total;
}

// ------------------------------------------------------------
// Tæller hvor mange varer der er i kurven i alt.
// Kan bruges til et lille tal ved kurv-ikonet.
// ------------------------------------------------------------
export function getItemCount() {
    const cart = getCart();

    let count = 0;

    for (const item of cart) {
        count = count + item.quantity;
    }

    return count;
}