// ============================================================
// MODEL: Produkter (productModel.js)
// ------------------------------------------------------------
// Denne model har ansvaret for de produkter butikken sælger.
// Her er produkterne bare skrevet ind i et array.
// Senere kan de f.eks. hentes fra et API i stedet, uden at
// view og controller skal laves om.
// ============================================================

// Listen med produkter. Hvert produkt har et id, en titel og en pris i kroner
const products = [
    { id: 1, title: 'T-shirt', price: 150 },
    { id: 2, title: 'Hættetrøje', price: 400 },
    { id: 3, title: 'Kasket', price: 120 },
    { id: 4, title: 'Sokker', price: 50 }
];

// ------------------------------------------------------------
// Returnerer alle produkter.
// ------------------------------------------------------------
export function getProducts() {
    return products;
}

// ------------------------------------------------------------
// Finder et enkelt produkt ud fra dets id.
// Returnerer undefined hvis produktet ikke findes.
// ------------------------------------------------------------
export function getProductById(id) {
    return products.find((product) => product.id === id);
}
