/**
 * NISHU LUXE (BY NITASHA) — Full Client-Side E-Commerce Application Engine
 * Pakistan E-Commerce Edition (PKR / Rs.)
 * Features:
 * - 12 Verified Bags with Real Pakistani Rupee (PKR) pricing
 * - Unsplash image error handling with graceful fallback
 * - Live real-time search across titles, categories & descriptions
 * - Dynamic category filters with live count badges
 * - Instant client-side sorting (featured, price asc/desc, top-rated)
 * - Wishlist counter with localStorage persistence
 * - Slide-out shopping cart drawer with Rs. 10,000 free shipping threshold
 * - Promo code NISHU20 (and legacy BAG20) granting 20% discount
 * - Pakistan-tailored Checkout modal (JazzCash/EasyPaisa, COD, Bank Transfer, Card)
 * - Printable Order Confirmation Receipt with reference ID (NL-2026-XXXX)
 * - Teacher Demo Admin modal to dynamically add products to the storefront
 * - Automatic cache reset for old USD localStorage entries
 */

// ==========================================
// 1. 12 VERIFIED BAGS DATASET (PKR / Rs.)
// ==========================================
const DEFAULT_STORE_BAGS = [
  {
    id: "bag-01",
    name: "Classic Tuscan Leather Tote",
    category: "Tote Bags",
    price: 8900.0,
    original_price: 13500.0,
    badge: "-34% OFF",
    rating: 4.9,
    reviews_count: 184,
    image_url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    stock_count: 28,
    description: "Crafted from rich full-grain leather with sturdy reinforced handles and roomy interior compartment. Fits 15\" laptops.",
    colors: ["Cognac Brown", "Obsidian Black", "Olive Green"]
  },
  {
    id: "bag-02",
    name: "Quilted Chain Evening Crossbody",
    category: "Crossbody & Shoulder",
    price: 6800.0,
    original_price: 9900.0,
    badge: "BESTSELLER",
    rating: 4.9,
    reviews_count: 248,
    image_url: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80",
    stock_count: 35,
    description: "Chic diamond-quilted finish with an elegant gold-tone curb chain strap. Perfect for evening events, dinners, and parties.",
    colors: ["Caramel Nude", "Jet Black", "Ruby Red"]
  },
  {
    id: "bag-03",
    name: "Structured Executive Satchel",
    category: "Luxury Handbags",
    price: 14500.0,
    original_price: 21000.0,
    badge: "BESTSELLER",
    rating: 5.0,
    reviews_count: 312,
    image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    stock_count: 14,
    description: "Modern architectural silhouette with turn-lock brass hardware, divider compartments, and detachable shoulder sling.",
    colors: ["Espresso Noir", "Bone White", "Burgundy"]
  },
  {
    id: "bag-04",
    name: "Vintage Canvas & Leather Weekender",
    category: "Travel Duffels",
    price: 11900.0,
    original_price: 17500.0,
    badge: "-32% OFF",
    rating: 4.9,
    reviews_count: 205,
    image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    stock_count: 19,
    description: "Heavy-duty waxed canvas with bridle leather trim, dedicated shoe compartment, and cabin-approved dimensions.",
    colors: ["Military Khaki", "Dark Coffee", "Charcoal Grey"]
  },
  {
    id: "bag-05",
    name: "Minimalist Leather City Backpack",
    category: "Backpacks",
    price: 9500.0,
    original_price: 14000.0,
    badge: "-32% OFF",
    rating: 4.8,
    reviews_count: 156,
    image_url: "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=800&q=80",
    stock_count: 22,
    description: "Sleek unisex urban backpack with padded 14\" laptop sleeve, water-resistant base, and anti-theft hidden pocket.",
    colors: ["Matte Black", "Chestnut Tan", "Navy Blue"]
  },
  {
    id: "bag-06",
    name: "Flap Lock Designer Handbag",
    category: "Luxury Handbags",
    price: 12800.0,
    original_price: 18500.0,
    badge: "-30% OFF",
    rating: 4.9,
    reviews_count: 144,
    image_url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
    stock_count: 16,
    description: "Smooth calfskin leather with polished metallic emblem and magnetic front flap. Comes with signature Nishu Luxe dust bag.",
    colors: ["Sienna Caramel", "Midnight Black", "Sage Green"]
  },
  {
    id: "bag-07",
    name: "Slouchy Minimalist Hobo Tote",
    category: "Tote Bags",
    price: 7500.0,
    original_price: 11000.0,
    badge: "-32% OFF",
    rating: 4.7,
    reviews_count: 67,
    image_url: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80",
    stock_count: 30,
    description: "Soft pebble leather with a natural slouchy drape. Generous capacity for notebooks, tablets, and daily essentials.",
    colors: ["Mocha Brown", "Oatmeal Beige", "Black"]
  },
  {
    id: "bag-08",
    name: "Compact Camera Crossbody",
    category: "Crossbody & Shoulder",
    price: 4500.0,
    original_price: 7000.0,
    badge: "SALE",
    rating: 4.6,
    reviews_count: 115,
    image_url: "https://images.unsplash.com/photo-1563903530908-afdd155d057a?auto=format&fit=crop&w=800&q=80",
    stock_count: 42,
    description: "Lightweight curved crossbody with dual zipper compartments. Keeps your phone, cards, and daily essentials organized.",
    colors: ["Terracotta", "Forest Green", "Classic Black"]
  },
  {
    id: "bag-09",
    name: "Commuter Laptop Backpack 15.6\"",
    category: "Backpacks",
    price: 8500.0,
    original_price: 12500.0,
    badge: "NEW",
    rating: 4.7,
    reviews_count: 88,
    image_url: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80",
    stock_count: 25,
    description: "Engineered for university students and working professionals. Water-repellent nylon, USB pass-through, and ergonomic padding.",
    colors: ["Storm Grey", "Stealth Black", "Oxford Blue"]
  },
  {
    id: "bag-10",
    name: "Croco-Embossed Work Tote",
    category: "Tote Bags",
    price: 13900.0,
    original_price: 19500.0,
    badge: "BESTSELLER",
    rating: 4.8,
    reviews_count: 92,
    image_url: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=80",
    stock_count: 18,
    description: "High-shine crocodile embossed leather that commands attention in any meeting. Includes detachable zipper pouch.",
    colors: ["Glossy Black", "Deep Plum", "Emerald Green"]
  },
  {
    id: "bag-11",
    name: "Voyager Leather 48H Overnight Duffel",
    category: "Travel Duffels",
    price: 16500.0,
    original_price: 24000.0,
    badge: "BESTSELLER",
    rating: 5.0,
    reviews_count: 173,
    image_url: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80",
    stock_count: 12,
    description: "Premium full-grain pull-up leather duffel bag. Handcrafted double zipper, reinforced base studs, and padded strap.",
    colors: ["Rustic Amber", "Espresso Dark", "Midnight Black"]
  },
  {
    id: "bag-12",
    name: "Half-Moon Crescent Saddle Bag",
    category: "Crossbody & Shoulder",
    price: 6500.0,
    original_price: 9500.0,
    badge: "NEW",
    rating: 4.8,
    reviews_count: 79,
    image_url: "https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=800&q=80",
    stock_count: 27,
    description: "Trending curved crescent shape with wide adjustable shoulder strap. Sits comfortably against the waist or cross-body.",
    colors: ["Merlot Burgundy", "Olive Khaki", "Jet Black"]
  }
];

// Fallback image if any remote image link fails
const FALLBACK_BAG_IMAGE = "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80";

// Swatch color hex lookup
const COLOR_HEX_MAP = {
  "Cognac Brown": "#8B4513",
  "Obsidian Black": "#111827",
  "Olive Green": "#556B2F",
  "Caramel Nude": "#C19A6B",
  "Jet Black": "#0F172A",
  "Ruby Red": "#991B1B",
  "Espresso Noir": "#2C1810",
  "Bone White": "#E2E8F0",
  "Burgundy": "#701A28",
  "Military Khaki": "#6B7280",
  "Dark Coffee": "#3E2723",
  "Charcoal Grey": "#374151",
  "Matte Black": "#18181B",
  "Chestnut Tan": "#9A3412",
  "Navy Blue": "#1E3A8A",
  "Sienna Caramel": "#B45309",
  "Midnight Black": "#030712",
  "Sage Green": "#4D7C0F",
  "Mocha Brown": "#78350F",
  "Oatmeal Beige": "#D6D3D1",
  "Black": "#000000",
  "Terracotta": "#C2410C",
  "Forest Green": "#166534",
  "Classic Black": "#111827",
  "Storm Grey": "#64748B",
  "Stealth Black": "#09090B",
  "Oxford Blue": "#1E293B",
  "Glossy Black": "#0A0A0A",
  "Deep Plum": "#581C87",
  "Emerald Green": "#065F46",
  "Rustic Amber": "#D97706",
  "Espresso Dark": "#26150B",
  "Merlot Burgundy": "#831843",
  "Olive Khaki": "#4B5563"
};

// ==========================================
// 2. STATE MANAGER CLASS
// ==========================================
class StoreApp {
  constructor() {
    this.API_BASE = (window.location.port === '8000') ? window.location.origin : 'http://127.0.0.1:8000';
    this.products = [];
    this.currentCategory = 'All';
    this.currentSort = 'featured';
    this.searchQuery = '';

    // Clear legacy USD caches to avoid mixing old catalog data
    this.clearLegacyCaches();

    // Persistent Cart & Wishlist with new PKR keys
    this.cart = this.loadCart();
    this.wishlist = new Set(this.loadWishlist());
    this.promoCode = '';
    this.discountPct = 0; // 0.20 for NISHU20

    // Selected colors on cards { bagId: colorString }
    this.selectedColors = {};
  }

  // Clear legacy caches from previous USD builds
  clearLegacyCaches() {
    try {
      const oldKeys = [
        'luxebags_admin_bags',
        'luxebags_cart',
        'luxebags_cart_v2',
        'luxebags_wishlist',
        'luxebags_wishlist_v2',
        'bespoke_cart_v1'
      ];
      oldKeys.forEach((key) => localStorage.removeItem(key));
    } catch (e) {
      console.warn('Cache clear check:', e);
    }
  }

  // Format Pakistani Rupees with commas
  formatPKR(amount) {
    const num = Math.round(Number(amount) || 0);
    return `Rs. ${num.toLocaleString('en-PK')}`;
  }

  init() {
    this.loadProducts();
    this.bindEvents();
    this.initCountdownTimer();
    this.updateCartBadge();
    this.updateWishlistBadge();
  }

  // --- Products Loading ---
  async loadProducts() {
    // 1. Start with verified 12 PKR bags
    let localList = [...DEFAULT_STORE_BAGS];

    // 2. Merge any admin-created bags from new PKR localStorage
    try {
      const savedAdminBags = localStorage.getItem('nishu_luxe_products_pkr_v2');
      if (savedAdminBags) {
        const extra = JSON.parse(savedAdminBags);
        localList = [...localList, ...extra];
      }
    } catch (e) {
      console.warn('Error reading admin bags:', e);
    }

    this.products = localList;
    this.renderProducts();
    this.updateCategoryTabs();

    // 3. Sync with FastAPI backend if online
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${this.API_BASE}/api/bags`, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const backendBags = await res.json();
        if (Array.isArray(backendBags) && backendBags.length > 0) {
          this.products = backendBags;
          this.renderProducts();
          this.updateCategoryTabs();
          console.log('✓ Synced with Nishu Luxe FastAPI SQLite backend!');
        }
      }
    } catch (err) {
      console.log('ℹ Running in standalone/Live Server mode with verified 12 PKR bags.');
    }
  }

  // --- Cart Persistence ---
  loadCart() {
    try {
      const saved = localStorage.getItem('nishu_luxe_cart_pkr_v2');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('nishu_luxe_cart_pkr_v2', JSON.stringify(this.cart));
    } catch (e) {}
    this.updateCartBadge();
    this.renderCartDrawer();
  }

  loadWishlist() {
    try {
      const saved = localStorage.getItem('nishu_luxe_wishlist_pkr_v2');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveWishlist() {
    try {
      localStorage.setItem('nishu_luxe_wishlist_pkr_v2', JSON.stringify([...this.wishlist]));
    } catch (e) {}
    this.updateWishlistBadge();
  }

  // --- Event Binding ---
  bindEvents() {
    // Live Search input in header
    const searchInput = document.getElementById('store-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.renderProducts();
      });
    }

    // Sort Dropdown
    const sortSelect = document.getElementById('store-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.renderProducts();
      });
    }

    // Cart Drawer triggers
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartOverlay = document.getElementById('cart-drawer-overlay');

    if (openCartBtn) openCartBtn.addEventListener('click', () => this.openCartDrawer());
    if (closeCartBtn) closeCartBtn.addEventListener('click', () => this.closeCartDrawer());
    if (cartOverlay) cartOverlay.addEventListener('click', () => this.closeCartDrawer());

    // Promo Code Box inside Cart (Supports NISHU20 and BAG20)
    const applyPromoBtn = document.getElementById('apply-promo-btn');
    const promoInput = document.getElementById('promo-code-input');
    if (applyPromoBtn && promoInput) {
      applyPromoBtn.addEventListener('click', () => {
        const code = promoInput.value.trim().toUpperCase();
        if (code === 'NISHU20' || code === 'BAG20') {
          this.promoCode = code;
          this.discountPct = 0.20;
          this.showToast(`🎉 Promo code ${code} applied! 20% discount granted.`);
        } else if (code === '') {
          this.promoCode = '';
          this.discountPct = 0;
        } else {
          this.showToast('❌ Invalid code. Use code: NISHU20 for 20% off.');
        }
        this.renderCartDrawer();
      });
    }

    // Checkout Modal Triggers
    const proceedCheckoutBtn = document.getElementById('proceed-checkout-btn');
    const closeCheckoutBtn = document.getElementById('close-checkout-modal-btn');
    const checkoutOverlay = document.getElementById('checkout-modal-overlay');
    const checkoutForm = document.getElementById('checkout-form');

    if (proceedCheckoutBtn) {
      proceedCheckoutBtn.addEventListener('click', () => {
        if (this.cart.length === 0) {
          this.showToast('Your shopping cart is empty.');
          return;
        }
        this.closeCartDrawer();
        this.openCheckoutModal();
      });
    }

    if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', () => this.closeCheckoutModal());
    if (checkoutOverlay) checkoutOverlay.addEventListener('click', () => this.closeCheckoutModal());

    if (checkoutForm) {
      checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.processCheckout(new FormData(checkoutForm));
      });
    }

    // Receipt Modal Close & Print
    const closeReceiptBtn = document.getElementById('close-receipt-btn');
    const printReceiptBtn = document.getElementById('print-receipt-btn');
    if (closeReceiptBtn) closeReceiptBtn.addEventListener('click', () => this.closeReceiptModal());
    if (printReceiptBtn) printReceiptBtn.addEventListener('click', () => window.print());

    // Admin Add Bag Modal Triggers
    const openAdminBtn = document.getElementById('open-admin-modal-btn');
    const closeAdminBtn = document.getElementById('close-admin-modal-btn');
    const adminOverlay = document.getElementById('admin-modal-overlay');
    const adminForm = document.getElementById('admin-add-bag-form');

    if (openAdminBtn) openAdminBtn.addEventListener('click', () => this.openAdminModal());
    if (closeAdminBtn) closeAdminBtn.addEventListener('click', () => this.closeAdminModal());
    if (adminOverlay) adminOverlay.addEventListener('click', () => this.closeAdminModal());

    if (adminForm) {
      adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAdminAddBag(new FormData(adminForm));
      });
    }

    // Quick View Modal Close
    const closeQvBtn = document.getElementById('close-quickview-btn');
    const qvOverlay = document.getElementById('quickview-overlay');
    if (closeQvBtn) closeQvBtn.addEventListener('click', () => this.closeQuickView());
    if (qvOverlay) qvOverlay.addEventListener('click', () => this.closeQuickView());

    // Keyboard ESC closes all modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeCartDrawer();
        this.closeCheckoutModal();
        this.closeReceiptModal();
        this.closeAdminModal();
        this.closeQuickView();
      }
    });
  }

  // --- Rendering Storefront Grid ---
  getFilteredProducts() {
    let list = [...this.products];

    // Category filter
    if (this.currentCategory !== 'All') {
      list = list.filter((p) => p.category.toLowerCase() === this.currentCategory.toLowerCase());
    }

    // Live search query
    if (this.searchQuery) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(this.searchQuery) ||
        p.category.toLowerCase().includes(this.searchQuery) ||
        (p.description && p.description.toLowerCase().includes(this.searchQuery))
      );
    }

    // Sorting
    if (this.currentSort === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (this.currentSort === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (this.currentSort === 'top-rated') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }

  renderProducts() {
    const grid = document.getElementById('store-products-grid');
    const countEl = document.getElementById('results-count-label');
    if (!grid) return;

    const list = this.getFilteredProducts();

    if (countEl) {
      countEl.textContent = `Showing ${list.length} luxury bags`;
    }

    if (list.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-500">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
          </div>
          <h3 class="text-lg font-bold text-slate-800">No matching bags found</h3>
          <p class="text-sm text-slate-500 mt-1">Try searching for another keyword or select a different category.</p>
          <button onclick="window.store.clearFilters()" class="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-slate-800">Reset Filters</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = list.map((bag) => {
      const isWishlisted = this.wishlist.has(bag.id);
      const activeColor = this.selectedColors[bag.id] || (bag.colors && bag.colors[0]) || 'Standard';

      // Badge styling
      let badgeBg = 'bg-rose-600 text-white';
      if (bag.badge === 'BESTSELLER') badgeBg = 'bg-emerald-600 text-white';
      if (bag.badge === 'NEW') badgeBg = 'bg-blue-600 text-white';

      // Color swatches
      const swatchesHtml = (bag.colors || ['Black', 'Tan']).map((col) => {
        const hex = COLOR_HEX_MAP[col] || '#333333';
        const isActive = col === activeColor;
        return `
          <button 
            type="button"
            class="color-swatch-dot ${isActive ? 'active' : ''}" 
            style="background-color: ${hex};" 
            title="${col}"
            onclick="window.store.selectColor('${bag.id}', '${col}')"
          ></button>
        `;
      }).join('');

      const savings = bag.original_price ? (bag.original_price - bag.price) : 0;

      return `
        <div class="product-card rounded-2xl border border-slate-200/90 overflow-hidden flex flex-col justify-between group relative" data-id="${bag.id}">
          
          <!-- Image Header with Badges & Wishlist -->
          <div class="product-image-container aspect-[4/3] sm:aspect-square relative flex items-center justify-center p-3">
            
            <!-- Badges -->
            <div class="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
              <span class="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-sm ${badgeBg}">
                ${bag.badge || 'SALE'}
              </span>
              ${bag.stock_count <= 15 ? `
                <span class="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                  Only ${bag.stock_count} Left
                </span>
              ` : ''}
            </div>

            <!-- Wishlist Button -->
            <button 
              type="button" 
              class="wishlist-btn absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-slate-500 hover:text-rose-600 ${isWishlisted ? 'active' : ''}" 
              onclick="window.store.toggleWishlist('${bag.id}')"
              title="Save to Wishlist"
            >
              <svg class="w-5 h-5 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
              </svg>
            </button>

            <!-- Product Image with Error Fallback -->
            <img 
              src="${bag.image_url}" 
              alt="${bag.name}" 
              onerror="this.onerror=null;this.src='${FALLBACK_BAG_IMAGE}';"
              class="product-image w-full h-full object-cover rounded-xl"
              loading="lazy"
            >

            <!-- Quick View Hover Button -->
            <button 
              type="button"
              onclick="window.store.openQuickView('${bag.id}')"
              class="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg bg-slate-900/90 text-white text-xs font-semibold tracking-wider uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 shadow-xl flex items-center gap-1.5 whitespace-nowrap hover:bg-black"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              <span>Quick View</span>
            </button>
          </div>

          <!-- Card Content Body -->
          <div class="p-4 flex flex-col justify-between flex-1">
            <div>
              <!-- Category & Selected Color Label -->
              <div class="flex items-center justify-between text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-1">
                <span>${bag.category}</span>
                <span class="text-amber-700 font-bold truncate max-w-[120px]">${activeColor}</span>
              </div>

              <!-- Title -->
              <h3 class="font-bold text-slate-900 text-base leading-snug line-clamp-1 group-hover:text-amber-600 transition-colors">
                ${bag.name}
              </h3>

              <!-- Rating & Reviews -->
              <div class="flex items-center gap-1.5 my-2">
                <div class="flex text-amber-400 text-xs">
                  ★ ★ ★ ★ ★
                </div>
                <span class="text-xs font-bold text-slate-700">${bag.rating.toFixed(1)}</span>
                <span class="text-[11px] text-slate-400">(${bag.reviews_count} reviews)</span>
              </div>

              <!-- Color Swatches Row -->
              <div class="flex items-center gap-1.5 my-2.5">
                ${swatchesHtml}
              </div>

              <!-- Price Row in PKR -->
              <div class="flex items-baseline flex-wrap gap-2 mt-1 mb-4">
                <span class="text-xl font-extrabold text-slate-950 font-main">
                  ${this.formatPKR(bag.price)}
                </span>
                ${bag.original_price ? `
                  <span class="text-xs text-slate-400 line-through font-semibold">
                    ${this.formatPKR(bag.original_price)}
                  </span>
                  <span class="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                    Save ${this.formatPKR(savings)}
                  </span>
                ` : ''}
              </div>
            </div>

            <!-- Full-width Add to Cart Button -->
            <button 
              type="button" 
              onclick="window.store.addToCart('${bag.id}')"
              class="w-full py-3 bg-slate-900 hover:bg-amber-600 active:scale-[0.98] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 group/btn"
            >
              <svg class="w-4 h-4 transition-transform group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <span>Add to Cart</span>
            </button>

          </div>

        </div>
      `;
    }).join('');
  }

  // --- Category Tabs ---
  updateCategoryTabs() {
    const tabsContainer = document.getElementById('category-tabs-container');
    if (!tabsContainer) return;

    const categories = [
      { name: 'All Bags', filter: 'All', count: this.products.length },
      { name: 'Tote Bags', filter: 'Tote Bags', count: this.products.filter(p => p.category === 'Tote Bags').length },
      { name: 'Crossbody & Shoulder', filter: 'Crossbody & Shoulder', count: this.products.filter(p => p.category === 'Crossbody & Shoulder').length },
      { name: 'Luxury Handbags', filter: 'Luxury Handbags', count: this.products.filter(p => p.category === 'Luxury Handbags').length },
      { name: 'Backpacks', filter: 'Backpacks', count: this.products.filter(p => p.category === 'Backpacks').length },
      { name: 'Travel Duffels', filter: 'Travel Duffels', count: this.products.filter(p => p.category === 'Travel Duffels').length }
    ];

    tabsContainer.innerHTML = categories.map((cat) => `
      <button 
        type="button"
        onclick="window.store.setCategory('${cat.filter}')"
        class="category-tab-btn px-4 py-2 rounded-full border border-slate-300 text-xs font-bold transition-all ${this.currentCategory === cat.filter ? 'active' : 'bg-white text-slate-700 hover:border-slate-500'}"
      >
        ${cat.name} (${cat.count})
      </button>
    `).join('');
  }

  setCategory(category) {
    this.currentCategory = category;
    this.updateCategoryTabs();
    this.renderProducts();
  }

  clearFilters() {
    this.currentCategory = 'All';
    this.searchQuery = '';
    const searchInput = document.getElementById('store-search-input');
    if (searchInput) searchInput.value = '';
    this.updateCategoryTabs();
    this.renderProducts();
  }

  selectColor(bagId, colorName) {
    this.selectedColors[bagId] = colorName;
    this.renderProducts();
  }

  // --- Wishlist Management ---
  toggleWishlist(bagId) {
    if (this.wishlist.has(bagId)) {
      this.wishlist.delete(bagId);
      this.showToast('Removed from your Wishlist.');
    } else {
      this.wishlist.add(bagId);
      this.showToast('❤️ Saved to your Wishlist!');
    }
    this.saveWishlist();
    this.renderProducts();
  }

  updateWishlistBadge() {
    const badge = document.getElementById('wishlist-count-badge');
    if (badge) {
      badge.textContent = this.wishlist.size;
    }
  }

  // ==========================================
  // 3. CART MANAGEMENT & DRAWER
  // ==========================================
  addToCart(bagId) {
    const bag = this.products.find((p) => p.id === bagId);
    if (!bag) return;

    const chosenColor = this.selectedColors[bag.id] || (bag.colors && bag.colors[0]) || 'Standard';
    const cartItemId = `${bag.id}_${chosenColor}`;

    const existing = this.cart.find((item) => item.cartItemId === cartItemId);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({
        cartItemId,
        id: bag.id,
        name: bag.name,
        category: bag.category,
        price: bag.price,
        image_url: bag.image_url,
        color: chosenColor,
        quantity: 1
      });
    }

    this.saveCart();
    this.showToast(`✓ Added 1x "${bag.name}" to cart!`);
    this.openCartDrawer();
  }

  updateCartQuantity(cartItemId, delta) {
    const item = this.cart.find((i) => i.cartItemId === cartItemId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.cart = this.cart.filter((i) => i.cartItemId !== cartItemId);
    }
    this.saveCart();
  }

  removeFromCart(cartItemId) {
    this.cart = this.cart.filter((i) => i.cartItemId !== cartItemId);
    this.saveCart();
    this.showToast('Item removed from cart.');
  }

  getCartSubtotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getCartItemCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  updateCartBadge() {
    const count = this.getCartItemCount();
    const subtotal = this.getCartSubtotal();

    const countBadge = document.getElementById('cart-count-badge');
    const headerTotal = document.getElementById('cart-header-total');

    if (countBadge) countBadge.textContent = count;
    if (headerTotal) headerTotal.textContent = this.formatPKR(subtotal);
  }

  openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');
    if (!drawer || !overlay) return;

    overlay.classList.remove('hidden');
    setTimeout(() => {
      overlay.classList.remove('opacity-0');
      drawer.classList.remove('translate-x-full');
    }, 10);

    this.renderCartDrawer();
  }

  closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');
    if (!drawer || !overlay) return;

    drawer.classList.add('translate-x-full');
    overlay.classList.add('opacity-0');
    setTimeout(() => {
      overlay.classList.add('hidden');
    }, 300);
  }

  renderCartDrawer() {
    const itemsContainer = document.getElementById('cart-items-list');
    const subtotalEl = document.getElementById('cart-subtotal-display');
    const discountEl = document.getElementById('cart-discount-display');
    const discountRow = document.getElementById('cart-discount-row');
    const totalEl = document.getElementById('cart-total-display');
    const deliveryEl = document.getElementById('cart-delivery-display');
    const progressFill = document.getElementById('free-shipping-progress-fill');
    const progressLabel = document.getElementById('free-shipping-progress-label');
    const proceedCheckoutBtn = document.getElementById('proceed-checkout-btn');

    const subtotal = this.getCartSubtotal();
    const discount = subtotal * this.discountPct;

    // Pakistan Shipping Logic:
    // If cart is empty: shipping = 0, text = "Rs. 0", disable checkout
    // If cart has items:
    //   Subtotal < 10,000 -> Rs. 500 standard delivery
    //   Subtotal >= 10,000 -> FREE delivery (Rs. 0)
    let shipping = 0;
    let isFreeShipping = false;

    if (this.cart.length === 0) {
      shipping = 0;
      if (deliveryEl) deliveryEl.textContent = 'Rs. 0';
      if (proceedCheckoutBtn) {
        proceedCheckoutBtn.disabled = true;
        proceedCheckoutBtn.classList.add('opacity-40', 'cursor-not-allowed');
      }
      if (progressFill && progressLabel) {
        progressFill.style.width = '0%';
        progressFill.className = 'h-full bg-slate-300 rounded-full transition-all duration-300';
        progressLabel.innerHTML = 'Add <strong>Rs. 10,000</strong> to get Free Express Delivery across Pakistan!';
      }
    } else {
      if (proceedCheckoutBtn) {
        proceedCheckoutBtn.disabled = false;
        proceedCheckoutBtn.classList.remove('opacity-40', 'cursor-not-allowed');
      }

      if (subtotal >= 10000) {
        isFreeShipping = true;
        shipping = 0;
        if (deliveryEl) deliveryEl.textContent = 'FREE';
        if (progressFill && progressLabel) {
          progressFill.style.width = '100%';
          progressFill.className = 'h-full bg-emerald-500 rounded-full transition-all duration-300';
          progressLabel.innerHTML = '🎉 <strong>FREE EXPRESS DELIVERY UNLOCKED ACROSS PAKISTAN!</strong>';
        }
      } else {
        isFreeShipping = false;
        shipping = 500.0;
        if (deliveryEl) deliveryEl.textContent = this.formatPKR(500);
        if (progressFill && progressLabel) {
          const remaining = 10000 - subtotal;
          const pct = Math.min(100, Math.max(5, (subtotal / 10000) * 100));
          progressFill.style.width = `${pct}%`;
          progressFill.className = 'h-full bg-amber-500 rounded-full transition-all duration-300';
          progressLabel.innerHTML = `Add <strong>${this.formatPKR(remaining)}</strong> more to unlock Free Express Delivery!`;
        }
      }
    }

    const total = Math.max(0, subtotal - discount + (this.cart.length > 0 ? shipping : 0));

    if (subtotalEl) subtotalEl.textContent = this.formatPKR(subtotal);

    if (discountRow && discountEl) {
      if (this.discountPct > 0) {
        discountRow.classList.remove('hidden');
        discountEl.textContent = `-${this.formatPKR(discount)} (${this.promoCode})`;
      } else {
        discountRow.classList.add('hidden');
      }
    }

    if (totalEl) totalEl.textContent = this.formatPKR(total);

    if (!itemsContainer) return;

    if (this.cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="py-16 text-center text-slate-500">
          <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          </div>
          <h4 class="font-bold text-slate-800 text-base">Your cart is currently empty</h4>
          <p class="text-xs text-slate-500 mt-1">Discover Nishu Luxe handcrafted bags & season deals.</p>
          <button onclick="window.store.closeCartDrawer()" class="mt-4 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800">
            Start Shopping
          </button>
        </div>
      `;
      return;
    }

    itemsContainer.innerHTML = this.cart.map((item) => {
      const lineTotal = item.price * item.quantity;
      return `
        <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex gap-3 items-center">
          <img 
            src="${item.image_url}" 
            alt="${item.name}" 
            onerror="this.onerror=null;this.src='${FALLBACK_BAG_IMAGE}';"
            class="w-16 h-16 object-cover rounded-lg border border-slate-200 shrink-0"
          >
          
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-1">
              <h5 class="text-xs font-bold text-slate-900 truncate">${item.name}</h5>
              <button onclick="window.store.removeFromCart('${item.cartItemId}')" class="text-slate-400 hover:text-rose-600 p-0.5" title="Remove Item">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
            
            <p class="text-[11px] text-amber-700 font-medium">Color: ${item.color}</p>
            
            <div class="flex items-center justify-between mt-2">
              <span class="text-xs font-extrabold text-slate-900">${this.formatPKR(lineTotal)}</span>
              
              <div class="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-0.5">
                <button class="qty-stepper-btn" onclick="window.store.updateCartQuantity('${item.cartItemId}', -1)">-</button>
                <span class="text-xs font-bold px-2 select-none">${item.quantity}</span>
                <button class="qty-stepper-btn" onclick="window.store.updateCartQuantity('${item.cartItemId}', 1)">+</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================
  // 4. CHECKOUT MODAL & ORDER RECEIPT
  // ==========================================
  openCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    const overlay = document.getElementById('checkout-modal-overlay');
    const orderItemsPreview = document.getElementById('checkout-items-preview');
    const summaryTotalEl = document.getElementById('checkout-summary-total');

    if (!modal) return;

    const subtotal = this.getCartSubtotal();
    const discount = subtotal * this.discountPct;
    const shipping = (subtotal >= 10000 || subtotal === 0) ? 0.0 : 500.0;
    const total = Math.max(0, subtotal - discount + (subtotal > 0 ? shipping : 0));

    if (summaryTotalEl) {
      summaryTotalEl.textContent = this.formatPKR(total);
    }

    if (orderItemsPreview) {
      orderItemsPreview.innerHTML = this.cart.map((i) => `
        <div class="flex justify-between text-xs py-1.5 border-b border-slate-200">
          <span class="truncate max-w-[200px] text-slate-700">${i.name} (x${i.quantity})</span>
          <span class="font-bold text-slate-900">${this.formatPKR(i.price * i.quantity)}</span>
        </div>
      `).join('');
    }

    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
    setTimeout(() => {
      overlay.classList.remove('opacity-0');
      modal.classList.remove('opacity-0', 'scale-95');
    }, 10);
  }

  closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    const overlay = document.getElementById('checkout-modal-overlay');
    if (!modal) return;

    modal.classList.add('opacity-0', 'scale-95');
    if (overlay) overlay.classList.add('opacity-0');
    setTimeout(() => {
      modal.classList.add('hidden');
      if (overlay) overlay.classList.add('hidden');
    }, 250);
  }

  async processCheckout(formData) {
    const subtotal = this.getCartSubtotal();
    const discount = subtotal * this.discountPct;
    const shipping = (subtotal >= 10000 || subtotal === 0) ? 0.0 : 500.0;
    const total = Math.max(0, subtotal - discount + (subtotal > 0 ? shipping : 0));

    const payload = {
      fullName: formData.get('fullName') || 'Demo Customer',
      email: formData.get('email') || 'customer@nishuluxe.pk',
      phone: formData.get('phone') || '+92 300 1234567',
      address: formData.get('address') || 'House 12, Street 4, Sector F-7/2',
      city: formData.get('city') || 'Islamabad',
      paymentMethod: formData.get('paymentMethod') || 'Cash on Delivery (COD)',
      promoCode: this.promoCode,
      discountAmount: discount,
      subtotal: subtotal,
      total: total,
      items: this.cart
    };

    let orderRef = `NL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    let estDelivery = '3-4 Business Days Express across Pakistan';

    // Submit to FastAPI backend if available
    try {
      const response = await fetch(`${this.API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        const data = await response.json();
        orderRef = data.orderRef;
        estDelivery = data.estimatedDelivery;
        console.log('✓ Order persisted to Nishu Luxe SQLite:', data);
      }
    } catch (e) {
      console.log('ℹ Backend offline. Generated local verified store receipt.');
    }

    // Close checkout and show receipt
    this.closeCheckoutModal();
    this.openReceiptModal({
      orderRef,
      estDelivery,
      ...payload
    });

    // Clear cart
    this.cart = [];
    this.promoCode = '';
    this.discountPct = 0;
    this.saveCart();
  }

  openReceiptModal(orderData) {
    const modal = document.getElementById('receipt-modal');
    const overlay = document.getElementById('receipt-modal-overlay');
    if (!modal) return;

    // Fill Receipt Fields
    document.getElementById('receipt-order-id').textContent = orderData.orderRef;
    document.getElementById('receipt-date').textContent = new Date().toLocaleDateString('en-PK', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    document.getElementById('receipt-customer-name').textContent = orderData.fullName;
    document.getElementById('receipt-customer-email').textContent = orderData.email;
    document.getElementById('receipt-customer-address').textContent = `${orderData.address}, ${orderData.city}`;
    document.getElementById('receipt-payment-method').textContent = orderData.paymentMethod;
    document.getElementById('receipt-delivery-estimate').textContent = orderData.estDelivery || '3-4 Business Days Express';

    const itemsTable = document.getElementById('receipt-items-table');
    if (itemsTable) {
      itemsTable.innerHTML = orderData.items.map((i) => `
        <tr class="border-b border-slate-200">
          <td class="py-2.5 font-medium text-slate-800 text-xs">${i.name} <span class="text-slate-500 font-normal">(${i.color})</span></td>
          <td class="py-2.5 text-center text-xs font-bold text-slate-700">${i.quantity}</td>
          <td class="py-2.5 text-right text-xs font-extrabold text-slate-900">${this.formatPKR(i.price * i.quantity)}</td>
        </tr>
      `).join('');
    }

    document.getElementById('receipt-subtotal').textContent = this.formatPKR(orderData.subtotal);
    document.getElementById('receipt-discount').textContent = `-${this.formatPKR(orderData.discountAmount)}`;
    document.getElementById('receipt-total').textContent = this.formatPKR(orderData.total);

    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
    setTimeout(() => {
      overlay.classList.remove('opacity-0');
      modal.classList.remove('opacity-0', 'scale-95');
    }, 10);

    this.showToast(`Order Placed! Reference: ${orderData.orderRef}`);
  }

  closeReceiptModal() {
    const modal = document.getElementById('receipt-modal');
    const overlay = document.getElementById('receipt-modal-overlay');
    if (!modal) return;

    modal.classList.add('opacity-0', 'scale-95');
    if (overlay) overlay.classList.add('opacity-0');
    setTimeout(() => {
      modal.classList.add('hidden');
      if (overlay) overlay.classList.add('hidden');
    }, 250);
  }

  // ==========================================
  // 5. QUICK VIEW MODAL
  // ==========================================
  openQuickView(bagId) {
    const bag = this.products.find((p) => p.id === bagId);
    if (!bag) return;

    const modal = document.getElementById('quickview-modal');
    const overlay = document.getElementById('quickview-overlay');

    const qvImg = document.getElementById('qv-image');
    qvImg.src = bag.image_url;
    qvImg.onerror = () => { qvImg.src = FALLBACK_BAG_IMAGE; };

    document.getElementById('qv-name').textContent = bag.name;
    document.getElementById('qv-category').textContent = bag.category;
    document.getElementById('qv-price').textContent = this.formatPKR(bag.price);
    document.getElementById('qv-original-price').textContent = bag.original_price ? this.formatPKR(bag.original_price) : '';
    document.getElementById('qv-rating').textContent = `${bag.rating.toFixed(1)} (${bag.reviews_count} reviews)`;
    document.getElementById('qv-description').textContent = bag.description;
    document.getElementById('qv-stock').textContent = `${bag.stock_count} units available in stock`;

    // Colors
    const swatches = document.getElementById('qv-color-swatches');
    if (swatches) {
      swatches.innerHTML = (bag.colors || ['Black']).map((c) => `
        <button 
          type="button" 
          onclick="window.store.selectColor('${bag.id}', '${c}'); document.getElementById('qv-selected-color').textContent = '${c}';"
          class="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold hover:border-slate-800 transition-colors"
        >
          ${c}
        </button>
      `).join('');
    }
    document.getElementById('qv-selected-color').textContent = this.selectedColors[bag.id] || (bag.colors && bag.colors[0]) || 'Standard';

    // Add to cart button in QV
    const qvAddBtn = document.getElementById('qv-add-cart-btn');
    if (qvAddBtn) {
      qvAddBtn.onclick = () => {
        this.addToCart(bag.id);
        this.closeQuickView();
      };
    }

    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
    setTimeout(() => {
      overlay.classList.remove('opacity-0');
      modal.classList.remove('opacity-0', 'scale-95');
    }, 10);
  }

  closeQuickView() {
    const modal = document.getElementById('quickview-modal');
    const overlay = document.getElementById('quickview-overlay');
    if (!modal) return;

    modal.classList.add('opacity-0', 'scale-95');
    if (overlay) overlay.classList.add('opacity-0');
    setTimeout(() => {
      modal.classList.add('hidden');
      if (overlay) overlay.classList.add('hidden');
    }, 250);
  }

  // ==========================================
  // 6. TEACHER DEMO: ADMIN ADD BAG
  // ==========================================
  openAdminModal() {
    const modal = document.getElementById('admin-modal');
    const overlay = document.getElementById('admin-modal-overlay');
    if (!modal) return;

    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
    setTimeout(() => {
      overlay.classList.remove('opacity-0');
      modal.classList.remove('opacity-0', 'scale-95');
    }, 10);
  }

  closeAdminModal() {
    const modal = document.getElementById('admin-modal');
    const overlay = document.getElementById('admin-modal-overlay');
    if (!modal) return;

    modal.classList.add('opacity-0', 'scale-95');
    if (overlay) overlay.classList.add('opacity-0');
    setTimeout(() => {
      modal.classList.add('hidden');
      if (overlay) overlay.classList.add('hidden');
    }, 250);
  }

  async handleAdminAddBag(formData) {
    const priceVal = parseFloat(formData.get('price')) || 8500.0;
    const origVal = parseFloat(formData.get('original_price')) || (priceVal * 1.3);

    const newBag = {
      id: `bag-${Date.now()}`,
      name: formData.get('name') || 'New Designer Bag',
      category: formData.get('category') || 'Tote Bags',
      price: priceVal,
      original_price: origVal,
      badge: formData.get('badge') || 'NEW',
      rating: parseFloat(formData.get('rating')) || 5.0,
      reviews_count: 1,
      image_url: formData.get('image_url') || FALLBACK_BAG_IMAGE,
      stock_count: parseInt(formData.get('stock_count'), 10) || 20,
      description: formData.get('description') || 'Handcrafted bespoke bag added via Admin Demo.',
      colors: ['Classic Black', 'Caramel Brown']
    };

    // Add locally immediately
    this.products.unshift(newBag);

    // Save to PKR localStorage
    try {
      const savedAdmin = JSON.parse(localStorage.getItem('nishu_luxe_products_pkr_v2') || '[]');
      savedAdmin.unshift(newBag);
      localStorage.setItem('nishu_luxe_products_pkr_v2', JSON.stringify(savedAdmin));
    } catch (e) {}

    // Post to FastAPI backend if online
    try {
      await fetch(`${this.API_BASE}/api/bags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBag)
      });
    } catch (e) {}

    this.closeAdminModal();
    this.updateCategoryTabs();
    this.renderProducts();
    this.showToast(`✨ Success: "${newBag.name}" added to the Storefront!`);

    // Reset Form
    const adminForm = document.getElementById('admin-add-bag-form');
    if (adminForm) adminForm.reset();
  }

  // --- Countdown Timer in Hero ---
  initCountdownTimer() {
    const hoursEl = document.getElementById('timer-hours');
    const minsEl = document.getElementById('timer-mins');
    const secsEl = document.getElementById('timer-secs');
    if (!hoursEl || !minsEl || !secsEl) return;

    let totalSeconds = 8 * 3600 + 42 * 60 + 19;

    setInterval(() => {
      totalSeconds = Math.max(0, totalSeconds - 1);
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      hoursEl.textContent = String(h).padStart(2, '0');
      minsEl.textContent = String(m).padStart(2, '0');
      secsEl.textContent = String(s).padStart(2, '0');
    }, 1000);
  }

  // --- Toast Notification ---
  showToast(message) {
    const toast = document.getElementById('store-toast');
    const text = document.getElementById('store-toast-text');
    if (!toast || !text) return;

    text.textContent = message;
    toast.classList.remove('translate-y-12', 'opacity-0');

    setTimeout(() => {
      toast.classList.add('translate-y-12', 'opacity-0');
    }, 3200);
  }
}

// Instantiate and expose globally
document.addEventListener('DOMContentLoaded', () => {
  window.store = new StoreApp();
  window.store.init();
});
