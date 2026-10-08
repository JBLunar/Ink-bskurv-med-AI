// ============================================================
// site.js - sidens startpunkt
// ------------------------------------------------------------
// Det er den eneste JavaScript fil som index.html henter.
// Den importerer controlleren og starter den.
// ============================================================

import { initCart } from './cartController.js';

// Start indkøbskurven
initCart();
