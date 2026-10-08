// ============================================================
// VIEW: Indkøbskurv (cartView.js)
// ------------------------------------------------------------
// Viewet har ansvaret for det brugeren SER.
// Det får data ind som parametre og laver HTML ud af dem.
// Det ændrer aldrig i data og kender ikke localStorage.
// Det bestemmer heller ikke hvad der sker ved klik - det er
// controllerens opgave.
// ============================================================

// ------------------------------------------------------------
// Bygger sidens faste ramme inde i <div id="app">.
// Skal kaldes en gang, før de andre view-funktioner bruges,
// fordi de skriver ind i de elementer der bliver lavet her.
// ------------------------------------------------------------
export function renderLayout() {
    // Find root containeren i index.html
    const app = document.querySelector('#app');

    // Template string (backticks) gør det muligt at skrive HTML over flere linjer
    app.innerHTML = `
        <header>
            <h1>Min butik</h1>
            <p>Varer i kurven: <span id="cart-count">0</span></p>
        </header>
        <main>
            <section>
                <h2>Produkter</h2>
                <ul id="product-list"></ul>
            </section>
            <section>
                <h2>Indkøbskurv</h2>
                <div id="cart"></div>
            </section>
        </main>
    `;
}

// ------------------------------------------------------------
// Viser listen af produkter man kan købe.
// products er et array med produkter (id, title, price).
// ------------------------------------------------------------
export function renderProducts(products) {
    const productList = document.querySelector('#product-list');

    // Vi starter med en tom tekst og bygger HTML'en op, et produkt ad gangen
    let html = '';

    for (const product of products) {
        // data-id gemmer produktets id på knappen,
        // så controlleren kan se hvilket produkt der blev klikket på
        html += `
            <li>
                <h3>${product.title}</h3>
                <p>${product.price} kr.</p>
                <button class="add-button" data-id="${product.id}">Læg i kurv</button>
            </li>
        `;
    }

    // Sæt den færdige HTML ind på siden
    productList.innerHTML = html;
}

// ------------------------------------------------------------
// Viser indholdet af kurven.
// cart er arrayet med varer fra modellen.
// total er den samlede pris (udregnet af modellen).
// ------------------------------------------------------------
export function renderCart(cart, total) {
    const cartContainer = document.querySelector('#cart');

    // Er kurven tom, viser vi bare en besked og stopper funktionen her
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Din kurv er tom.</p>';
        return;
    }

    // Start på listen med varer
    let html = '<ul>';

    for (const item of cart) {
        // Prisen for denne linje: pris gange antal
        const linePrice = item.price * item.quantity;

        html += `
            <li>
                <h3>${item.title}</h3>
                <p>${item.price} kr. x ${item.quantity} = ${linePrice} kr.</p>
                <button class="minus-button" data-id="${item.id}">-</button>
                <button class="plus-button" data-id="${item.id}">+</button>
                <button class="remove-button" data-id="${item.id}">Fjern</button>
            </li>
        `;
    }

    // Slut på listen, og derefter total og knappen der tømmer kurven
    html += '</ul>';
    html += `
        <p>Total: ${total} kr.</p>
        <button id="clear-button">Tøm kurv</button>
    `;

    cartContainer.innerHTML = html;
}

// ------------------------------------------------------------
// Viser hvor mange varer der er i kurven (tallet i headeren).
// ------------------------------------------------------------
export function renderCartCount(count) {
    const cartCount = document.querySelector('#cart-count');

    // textContent ændrer kun teksten inde i elementet
    cartCount.textContent = count;
}
