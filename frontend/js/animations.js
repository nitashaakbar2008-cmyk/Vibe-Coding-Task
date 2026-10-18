/**
 * ATELIER VÉLÈNE — Editorial High-Fashion Animation Engine
 * Phase 1 & Phase 2: Complete Interactive Catalog, Dual-Image Hover Crossfade,
 * Swatch Swapping, Luxury Quick-View & Material Inspector, and Bag Drawer.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins if available
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  initCustomCursor();
  initNavbarScroll();
  initHeroEntrance();
  initHeroParallax();
  initSpotlightHotspots();
  initMagneticButtons();
  initInteractiveModals();
  initCatalogCollection();
  initQuickViewModal();
});

/* ==========================================================================
   GLOBAL UTILITIES: TOAST & BAG STORE
   ========================================================================== */
function showLuxuryToast(message) {
  const toastNotification = document.getElementById('luxury-toast');
  const toastText = document.getElementById('toast-message');
  if (!toastNotification || !toastText) return;

  toastText.textContent = message;
  gsap.to(toastNotification, {
    y: 0,
    opacity: 1,
    duration: 0.4,
    ease: 'power3.out'
  });

  setTimeout(() => {
    gsap.to(toastNotification, {
      y: 40,
      opacity: 0,
      duration: 0.4,
      ease: 'power3.in'
    });
  }, 3200);
}

function addToPrivateBag(bag, colorway) {
  if (window.CartEngine) {
    window.CartEngine.addItem(bag.id, colorway ? colorway.id : null);
  }
}

/* ==========================================================================
   1. CUSTOM LUXURY CURSOR
   ========================================================================== */
function initCustomCursor() {
  const dot = document.querySelector('.cursor-dot');
  const follower = document.querySelector('.cursor-follower');
  const cursorText = document.querySelector('.cursor-text');

  if (!dot || !follower || window.matchMedia('(pointer: coarse)').matches) {
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  const setDotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' });
  const setDotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' });
  const setFollowerX = gsap.quickTo(follower, 'x', { duration: 0.28, ease: 'power3.out' });
  const setFollowerY = gsap.quickTo(follower, 'y', { duration: 0.28, ease: 'power3.out' });

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    setDotX(mouseX);
    setDotY(mouseY);
    setFollowerX(mouseX);
    setFollowerY(mouseY);
  });

  attachCursorTargets();

  document.addEventListener('mouseleave', () => {
    gsap.to([dot, follower], { opacity: 0, duration: 0.2 });
  });

  document.addEventListener('mouseenter', () => {
    gsap.to([dot, follower], { opacity: 1, duration: 0.2 });
  });
}

function attachCursorTargets() {
  const follower = document.querySelector('.cursor-follower');
  const cursorText = document.querySelector('.cursor-text');
  const interactiveTargets = document.querySelectorAll('a, button, [data-cursor], .hotspot-pin, input, select');

  interactiveTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
      const customLabel = el.getAttribute('data-cursor');
      if (customLabel && cursorText) {
        cursorText.textContent = customLabel;
      } else if (cursorText) {
        cursorText.textContent = '';
      }
    });

    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
      if (cursorText) cursorText.textContent = '';
    });
  });
}

/* ==========================================================================
   2. STICKY EDITORIAL NAVBAR
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('editorial-navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('glass-nav-scrolled');
      navbar.classList.remove('border-transparent');
    } else {
      navbar.classList.remove('glass-nav-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   3. HERO ENTRANCE TIMELINE
   ========================================================================== */
function initHeroEntrance() {
  if (typeof gsap === 'undefined') return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo(
    '#editorial-navbar',
    { y: -30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.1, delay: 0.1 }
  )
  .fromTo(
    '.hero-kicker',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.9 },
    '-=0.7'
  )
  .fromTo(
    '.hero-title-line',
    { opacity: 0, y: 40, skewY: 2 },
    { opacity: 1, y: 0, skewY: 0, duration: 1.2, stagger: 0.16 },
    '-=0.7'
  )
  .fromTo(
    '.hero-desc',
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 1 },
    '-=0.8'
  )
  .fromTo(
    '.hero-cta-group',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.9 },
    '-=0.7'
  )
  .fromTo(
    '.hero-metadata-item',
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
    '-=0.6'
  )
  .fromTo(
    '.hero-showcase-container',
    { opacity: 0, scale: 0.94, y: 30 },
    { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: 'power4.out' },
    '-=1.2'
  )
  .fromTo(
    '.hero-floating-badge',
    { opacity: 0, scale: 0.8, x: 20 },
    { opacity: 1, scale: 1, x: 0, duration: 0.9, stagger: 0.2 },
    '-=0.8'
  );
}

/* ==========================================================================
   4. HERO 3D PARALLAX / TILT DEPTH
   ========================================================================== */
function initHeroParallax() {
  const stage = document.querySelector('.hero-stage');
  const card = document.querySelector('.bag-card-tilt');
  const bagImg = document.querySelector('.hero-bag-img');
  const badges = document.querySelectorAll('.floating-badge');

  if (!stage || !card || window.matchMedia('(pointer: coarse)').matches) return;

  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / rect.height) * 14;
    const rotY = (x / rect.width) * 18;

    gsap.to(card, {
      rotateX: rotX,
      rotateY: rotY,
      duration: 0.6,
      ease: 'power2.out',
      transformPerspective: 1200
    });

    if (bagImg) {
      gsap.to(bagImg, {
        x: (x / rect.width) * 22,
        y: (y / rect.height) * 22,
        duration: 0.7,
        ease: 'power2.out'
      });
    }

    badges.forEach((badge, index) => {
      const depth = (index + 1) * 12;
      gsap.to(badge, {
        x: (x / rect.width) * depth,
        y: (y / rect.height) * depth,
        duration: 0.8,
        ease: 'power2.out'
      });
    });
  });

  stage.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 1.2,
      ease: 'elastic.out(1, 0.5)'
    });
    if (bagImg) {
      gsap.to(bagImg, { x: 0, y: 0, duration: 1, ease: 'power2.out' });
    }
    badges.forEach((badge) => {
      gsap.to(badge, { x: 0, y: 0, duration: 1, ease: 'power2.out' });
    });
  });
}

/* ==========================================================================
   5. FEATURED FLAGSHIP BAG SPOTLIGHT & HOTSPOTS
   ========================================================================== */
function initSpotlightHotspots() {
  const hotspots = document.querySelectorAll('.hotspot-pin');
  const specTabs = document.querySelectorAll('.spec-tab-btn');
  const activeDetailCard = document.getElementById('active-spec-detail');

  if (!hotspots.length) return;

  const specData = {
    '1': {
      title: 'Solid Brass Clasp',
      subtitle: 'Cast in Piedmont & 24K Brushed Gold PVD Finished',
      description: 'Custom-engineered solid brass turn-lock hardware, milled to microscopic tolerances and coated with a 24-karat PVD protective barrier that resists oxidation and salinity.',
      metric1: 'SOLID BRASS',
      label1: 'Hardware Alloy',
      metric2: '0.02 mm',
      label2: 'Milling Precision'
    },
    '2': {
      title: 'Double-Pass French Saddle Stitch',
      subtitle: 'Hand-Pierced with Waxed Fil Au Chinois Linen Thread',
      description: 'Master artisans hand-punch each hole using French pricking irons at 8 stitches per inch. Two needles pass simultaneously in opposite directions—creating a seam that will never unravel.',
      metric1: '8 SPI',
      label1: 'Stitch Density',
      metric2: '18 HOURS',
      label2: 'Hand-Craft Cycle'
    },
    '3': {
      title: 'Full-Grain Tuscan Vachetta',
      subtitle: '2.4mm Slow-Tanned Leather from Santa Croce sull’Arno',
      description: 'Slow vegetable-tanned in wooden barrels using chestnut, mimosa, and quebracho extracts over 60 days. Untreated with synthetic poly-coatings to allow deep, lustrous patina formation.',
      metric1: '2.4 mm',
      label1: 'Caliper Thickness',
      metric2: '60 DAYS',
      label2: 'Barrel Tanning'
    },
    '4': {
      title: '7-Coat Hand-Burnished Edge',
      subtitle: 'Heated Iron Creased & Sealed with Organic Tuscan Beeswax',
      description: 'Each raw edge is hand-beveled, layered with seven coats of bespoke Italian matte edge paint, and burnished with hot bone folders and organic beeswax for a glass-like perimeter.',
      metric1: '7 COATS',
      label1: 'Edge Paint Layers',
      metric2: '100% ORGANIC',
      label2: 'Beeswax Finish'
    }
  };

  const updateActiveSpec = (id) => {
    hotspots.forEach((pin) => {
      const pinId = pin.getAttribute('data-spotlight');
      if (pinId === id) {
        pin.classList.add('active');
        gsap.to(pin.querySelector('.hotspot-core'), { scale: 1.25, duration: 0.3 });
      } else {
        pin.classList.remove('active');
        gsap.to(pin.querySelector('.hotspot-core'), { scale: 1, duration: 0.3 });
      }
    });

    specTabs.forEach((tab) => {
      const tabId = tab.getAttribute('data-tab');
      if (tabId === id) {
        tab.classList.add('border-b-2', 'border-[#C5A059]', 'text-[#111111]', 'font-semibold');
        tab.classList.remove('text-[#2C221E]/60', 'border-transparent');
      } else {
        tab.classList.remove('border-b-2', 'border-[#C5A059]', 'text-[#111111]', 'font-semibold');
        tab.classList.add('text-[#2C221E]/60', 'border-transparent');
      }
    });

    if (activeDetailCard && specData[id]) {
      const data = specData[id];
      gsap.to(activeDetailCard, {
        opacity: 0,
        y: 8,
        duration: 0.2,
        onComplete: () => {
          document.getElementById('spec-title').textContent = data.title;
          document.getElementById('spec-subtitle').textContent = data.subtitle;
          document.getElementById('spec-desc').textContent = data.description;
          document.getElementById('spec-m1').textContent = data.metric1;
          document.getElementById('spec-l1').textContent = data.label1;
          document.getElementById('spec-m2').textContent = data.metric2;
          document.getElementById('spec-l2').textContent = data.label2;

          gsap.to(activeDetailCard, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
        }
      });
    }
  };

  hotspots.forEach((pin) => {
    pin.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = pin.getAttribute('data-spotlight');
      updateActiveSpec(id);
    });

    pin.addEventListener('mouseenter', () => {
      const id = pin.getAttribute('data-spotlight');
      updateActiveSpec(id);
    });
  });

  specTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const id = tab.getAttribute('data-tab');
      updateActiveSpec(id);
    });
  });
}

/* ==========================================================================
   6. MAGNETIC BUTTONS EFFECT
   ========================================================================== */
function initMagneticButtons() {
  const magnets = document.querySelectorAll('.magnetic-btn');

  if (window.matchMedia('(pointer: coarse)').matches) return;

  magnets.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.32,
        y: y * 0.32,
        duration: 0.35,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)'
      });
    });
  });
}

/* ==========================================================================
   7. INTERACTIVE MODALS, SEARCH & SHOPPING BAG DRAWER
   ========================================================================== */
function initInteractiveModals() {
  const bagDrawer = document.getElementById('bag-drawer');
  const bagDrawerOverlay = document.getElementById('bag-drawer-overlay');
  const bagOpenTriggers = document.querySelectorAll('.trigger-bag-drawer');
  const bagCloseBtn = document.getElementById('close-bag-drawer');

  const searchModal = document.getElementById('search-modal');
  const searchOverlay = document.getElementById('search-overlay');
  const searchTrigger = document.getElementById('trigger-search-modal');
  const closeSearchBtn = document.getElementById('close-search-modal');
  const searchInput = document.getElementById('search-input');

  const openBag = () => {
    if (!bagDrawer || !bagDrawerOverlay) return;
    bagDrawerOverlay.classList.remove('hidden');
    setTimeout(() => {
      bagDrawerOverlay.classList.remove('opacity-0');
      bagDrawer.classList.remove('translate-x-full');
    }, 10);
  };

  const closeBag = () => {
    if (!bagDrawer || !bagDrawerOverlay) return;
    bagDrawer.classList.add('translate-x-full');
    bagDrawerOverlay.classList.add('opacity-0');
    setTimeout(() => {
      bagDrawerOverlay.classList.add('hidden');
    }, 350);
  };

  bagOpenTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openBag();
    });
  });

  if (bagCloseBtn) bagCloseBtn.addEventListener('click', closeBag);
  if (bagDrawerOverlay) bagDrawerOverlay.addEventListener('click', closeBag);

  const openSearch = () => {
    if (!searchModal) return;
    searchModal.classList.remove('hidden');
    setTimeout(() => {
      searchModal.classList.remove('opacity-0');
      if (searchInput) searchInput.focus();
    }, 10);
  };

  const closeSearch = () => {
    if (!searchModal) return;
    searchModal.classList.add('opacity-0');
    setTimeout(() => {
      searchModal.classList.add('hidden');
    }, 300);
  };

  if (searchTrigger) searchTrigger.addEventListener('click', openSearch);
  if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearch);
  if (searchOverlay) searchOverlay.addEventListener('click', closeSearch);

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') {
      closeBag();
      closeSearch();
      const qvModal = document.getElementById('quickview-modal');
      if (qvModal && !qvModal.classList.contains('hidden')) {
        closeQuickViewModal();
      }
    }
  });

  // Currency Switcher
  const currencyBtn = document.getElementById('currency-toggle');
  if (currencyBtn) {
    const currencies = ['USD $', 'EUR €', 'GBP £'];
    let currIndex = 0;
    currencyBtn.addEventListener('click', () => {
      currIndex = (currIndex + 1) % currencies.length;
      currencyBtn.textContent = currencies[currIndex];
      showLuxuryToast(`Currency converted to ${currencies[currIndex]}`);
    });
  }

  // Allocation CTA Buttons: "RESERVE BESPOKE ALLOCATION"
  const reserveButtons = document.querySelectorAll('.action-reserve-bag');
  reserveButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.CartEngine) {
        window.CartEngine.addItem('grand-archetype', 'sienna');
      }
    });
  });
}

/* ==========================================================================
   8. PHASE 2: CURATED COLLECTION ENGINE (FILTERS, SWATCHES, CARDS)
   ========================================================================== */
let currentCategory = 'all';
let currentSort = 'featured';

function initCatalogCollection() {
  const grid = document.getElementById('collection-grid');
  const filterPills = document.querySelectorAll('.filter-pill');
  const sortSelect = document.getElementById('collection-sort');

  if (!grid || typeof BAG_CATALOG === 'undefined') return;

  const renderCatalog = () => {
    let items = [...BAG_CATALOG];

    // Filter by Category
    if (currentCategory !== 'all') {
      items = items.filter((b) => b.category === currentCategory);
    }

    // Sort
    if (currentSort === 'price-asc') {
      items.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-desc') {
      items.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'scarcity') {
      items.sort((a, b) => a.stockCount - b.stockCount);
    }

    // Render Cards
    grid.innerHTML = items.map((bag) => {
      const activeColorway = bag.colorways[0];
      const swatchesHtml = bag.colorways.map((cw, idx) => `
        <button 
          type="button"
          class="swatch-dot ${idx === 0 ? 'active' : ''}" 
          data-bag-id="${bag.id}" 
          data-color-id="${cw.id}" 
          style="background-color: ${cw.hex};" 
          title="${cw.name}"
          data-cursor="${cw.name.split(' ')[0].toUpperCase()}"
        ></button>
      `).join('');

      return `
        <article class="product-card-luxury bg-sand/35 border border-gold/20 rounded-2xl p-4 flex flex-col justify-between overflow-hidden group relative" data-bag-id="${bag.id}" data-active-color="${activeColorway.id}">
          
          <!-- Top Badges -->
          <div class="flex items-center justify-between mb-1">
            <span class="text-[9px] uppercase font-sans tracking-widest text-gold font-bold px-2 py-0.5 rounded-full bg-white/90 border border-gold/25">
              ${bag.editionTag}
            </span>
            <span class="text-[9px] font-mono text-espresso/60 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full ${bag.stockCount <= 3 ? 'bg-rose-600 animate-ping' : 'bg-amber-600'}"></span>
              ${bag.stockCount} left
            </span>
          </div>

          <!-- Dual-Image Crossfade Container -->
          <div class="img-crossfade-wrap w-full aspect-[4/5] rounded-xl my-3 relative flex items-center justify-center cursor-pointer group/img" data-action="quickview" data-bag-id="${bag.id}">
            <img src="${activeColorway.primaryImg}" alt="${bag.name}" class="img-crossfade-primary w-full h-full object-cover rounded-xl select-none" loading="lazy">
            <img src="${activeColorway.secondaryImg}" alt="${bag.name} Secondary Angle" class="img-crossfade-secondary w-full h-full object-cover rounded-xl select-none" loading="lazy">
            
            <!-- Quick View Hover Floating Pill -->
            <button class="btn-card-quickview absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full glass-dark text-alabaster text-[10px] font-sans tracking-widest uppercase opacity-0 translate-y-2 group-hover/img:opacity-100 group-hover/img:translate-y-0 transition-all duration-300 shadow-xl border border-gold/40 flex items-center gap-1.5 whitespace-nowrap z-20 hover:bg-gold hover:text-obsidian" data-action="quickview" data-bag-id="${bag.id}" data-cursor="VIEW">
              <svg class="w-3.5 h-3.5 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>Quick View</span>
            </button>
          </div>

          <!-- Card Bottom Meta -->
          <div>
            <!-- Swatches row -->
            <div class="flex items-center justify-between py-1 mb-2">
              <div class="flex items-center gap-2">
                ${swatchesHtml}
              </div>
              <span class="card-color-label text-[10px] font-sans text-espresso/60 truncate max-w-[130px]">
                ${activeColorway.name}
              </span>
            </div>

            <!-- Title & Price -->
            <div class="flex items-start justify-between gap-2">
              <h3 class="font-serif text-lg text-obsidian font-medium group-hover:text-gold transition-colors duration-200">
                ${bag.name}
              </h3>
              <span class="font-serif font-semibold text-obsidian shrink-0">
                ${bag.priceDisplay}
              </span>
            </div>

            <!-- Fits Devices -->
            <p class="text-[11px] font-sans text-espresso/50 mt-1 line-clamp-1">
              ${bag.fitsDevices}
            </p>

            <!-- Reserve Allocation CTA -->
            <button class="btn-card-add btn-luxury btn-luxury-gold w-full mt-3 py-2.5 rounded-xl text-[10px] font-sans font-semibold tracking-widest-luxury uppercase shadow-sm flex items-center justify-center gap-1.5" data-action="add-to-bag" data-bag-id="${bag.id}" data-cursor="RESERVE">
              <span>Reserve Allocation</span>
            </button>
          </div>

        </article>
      `;
    }).join('');

    // Animate cards reveal with GSAP
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(
        grid.children,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'power2.out' }
      );
    }

    // Attach Swatch Click Handlers
    grid.querySelectorAll('.swatch-dot').forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const bagId = dot.getAttribute('data-bag-id');
        const colorId = dot.getAttribute('data-color-id');
        const card = grid.querySelector(`article[data-bag-id="${bagId}"]`);
        if (!card) return;

        const bag = BAG_CATALOG.find((b) => b.id === bagId);
        if (!bag) return;

        const colorway = bag.colorways.find((cw) => cw.id === colorId);
        if (!colorway) return;

        // Update card's active color attribute
        card.setAttribute('data-active-color', colorId);

        // Update images with smooth fade
        const primaryImg = card.querySelector('.img-crossfade-primary');
        const secondaryImg = card.querySelector('.img-crossfade-secondary');
        const colorLabel = card.querySelector('.card-color-label');

        if (primaryImg && secondaryImg) {
          gsap.to([primaryImg, secondaryImg], {
            opacity: 0.4,
            duration: 0.15,
            onComplete: () => {
              primaryImg.src = colorway.primaryImg;
              secondaryImg.src = colorway.secondaryImg;
              gsap.to(primaryImg, { opacity: 1, duration: 0.3 });
              gsap.to(secondaryImg, { opacity: 0, duration: 0.3 });
            }
          });
        }

        if (colorLabel) {
          colorLabel.textContent = colorway.name;
        }

        // Update active class on dots
        card.querySelectorAll('.swatch-dot').forEach((d) => d.classList.remove('active'));
        dot.classList.add('active');
      });
    });

    // Attach Quick View Triggers
    grid.querySelectorAll('[data-action="quickview"]').forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const bagId = trigger.getAttribute('data-bag-id');
        const card = grid.querySelector(`article[data-bag-id="${bagId}"]`);
        const activeColorId = card ? card.getAttribute('data-active-color') : null;
        openQuickViewModal(bagId, activeColorId);
      });
    });

    // Attach Add to Bag Triggers
    grid.querySelectorAll('[data-action="add-to-bag"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const bagId = btn.getAttribute('data-bag-id');
        const card = grid.querySelector(`article[data-bag-id="${bagId}"]`);
        const activeColorId = card ? card.getAttribute('data-active-color') : null;

        const bag = BAG_CATALOG.find((b) => b.id === bagId);
        if (!bag) return;

        const colorway = bag.colorways.find((cw) => cw.id === activeColorId) || bag.colorways[0];

        // Button micro-interaction
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span>ALLOCATED ✦</span>`;
        btn.classList.add('bg-gold', 'text-obsidian');

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('bg-gold', 'text-obsidian');
        }, 1500);

        addToPrivateBag(bag, colorway);
      });
    });

    // Reattach custom cursor hover
    attachCursorTargets();
  };

  // Filter Pills Events
  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-category');
      renderCatalog();
    });
  });

  // Sort Dropdown Event
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderCatalog();
    });
  }

  // Listen for backend inventory updates
  window.addEventListener('bags:updated', () => {
    renderCatalog();
  });

  // Initial render
  renderCatalog();
}

/* ==========================================================================
   9. PHASE 2: LUXURY QUICK-VIEW & MATERIAL INSPECTOR MODAL
   ========================================================================== */
let activeModalBag = null;
let activeModalColorway = null;

function initQuickViewModal() {
  const modal = document.getElementById('quickview-modal');
  const overlay = document.getElementById('quickview-overlay');
  const closeBtn = document.getElementById('close-quickview-modal');
  const addToBagBtn = document.getElementById('qv-add-to-bag');

  if (!modal) return;

  if (closeBtn) closeBtn.addEventListener('click', closeQuickViewModal);
  if (overlay) overlay.addEventListener('click', closeQuickViewModal);

  // Accordion Toggle Handlers
  modal.querySelectorAll('.accordion-header').forEach((header) => {
    header.addEventListener('click', () => {
      const parent = header.closest('.accordion-item');
      if (!parent) return;

      const isOpen = parent.classList.contains('open');
      // Close other accordions for sleek editorial feel
      modal.querySelectorAll('.accordion-item').forEach((item) => item.classList.remove('open'));

      if (!isOpen) {
        parent.classList.add('open');
      }
    });
  });

  // Add to Bag inside Modal
  if (addToBagBtn) {
    addToBagBtn.addEventListener('click', () => {
      if (activeModalBag && activeModalColorway) {
        addToPrivateBag(activeModalBag, activeModalColorway);
        closeQuickViewModal();
      }
    });
  }
}

function openQuickViewModal(bagId, colorwayId) {
  const modal = document.getElementById('quickview-modal');
  const content = document.getElementById('quickview-modal-content');
  if (!modal || typeof BAG_CATALOG === 'undefined') return;

  const bag = BAG_CATALOG.find((b) => b.id === bagId);
  if (!bag) return;

  activeModalBag = bag;
  activeModalColorway = bag.colorways.find((cw) => cw.id === colorwayId) || bag.colorways[0];

  // Populate Header & Text
  document.getElementById('qv-edition-tag').textContent = bag.editionTag;
  document.getElementById('qv-stock-status').textContent = bag.stockStatus;
  document.getElementById('qv-title').textContent = bag.name;
  document.getElementById('qv-price').textContent = bag.priceDisplay;
  document.getElementById('qv-desc').textContent = bag.description;

  // Populate Accordion Data
  document.getElementById('qv-acc-dim').textContent = bag.dimensions;
  document.getElementById('qv-acc-strap').textContent = bag.strapDrop;
  document.getElementById('qv-acc-weight').textContent = bag.weight;
  document.getElementById('qv-acc-fits').textContent = bag.fitsDevices;
  document.getElementById('qv-acc-origin').textContent = bag.origin;
  document.getElementById('qv-acc-tannery').textContent = bag.tannery;
  document.getElementById('qv-acc-hardware').textContent = bag.hardware;
  document.getElementById('qv-acc-care').textContent = bag.careGuide;

  // Proportional Size Visualization
  document.getElementById('qv-fits-device').textContent = `Fits: ${bag.fitsDevices.split(',')[0]}`;
  document.getElementById('qv-dimensions-summary').textContent = bag.dimensions.split('(')[0];
  document.getElementById('qv-weight-summary').textContent = `Weight: ${bag.weight}`;

  // Update Colorways & Gallery
  renderModalColorwaysAndGallery();

  // Reveal Modal with GSAP
  modal.classList.remove('hidden');
  setTimeout(() => {
    modal.classList.remove('opacity-0');
    if (content) {
      gsap.fromTo(content, { scale: 0.94, y: 20 }, { scale: 1, y: 0, duration: 0.4, ease: 'power3.out' });
    }
  }, 10);

  attachCursorTargets();
}

function renderModalColorwaysAndGallery() {
  if (!activeModalBag || !activeModalColorway) return;

  const mainImg = document.getElementById('qv-main-img');
  const galleryStrip = document.getElementById('qv-gallery-strip');
  const swatchList = document.getElementById('qv-swatch-list');
  const colorNameLabel = document.getElementById('qv-color-name');

  // Set initial main image
  if (mainImg) {
    mainImg.src = activeModalColorway.primaryImg;
  }
  if (colorNameLabel) {
    colorNameLabel.textContent = `${activeModalColorway.name} (${activeModalColorway.leatherType})`;
  }

  // Render Swatches
  if (swatchList) {
    swatchList.innerHTML = activeModalBag.colorways.map((cw) => `
      <button 
        type="button"
        class="swatch-dot ${cw.id === activeModalColorway.id ? 'active' : ''}" 
        style="background-color: ${cw.hex};" 
        title="${cw.name}"
        data-qv-color="${cw.id}"
      ></button>
    `).join('');

    swatchList.querySelectorAll('.swatch-dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        const cId = dot.getAttribute('data-qv-color');
        activeModalColorway = activeModalBag.colorways.find((c) => c.id === cId);
        renderModalColorwaysAndGallery();
      });
    });
  }

  // Render Thumbnails Gallery
  if (galleryStrip) {
    const images = activeModalColorway.gallery || [activeModalColorway.primaryImg, activeModalColorway.secondaryImg];
    galleryStrip.innerHTML = images.map((imgUrl, i) => `
      <button 
        type="button"
        class="qv-thumb-btn w-16 h-16 rounded-xl overflow-hidden border-2 ${i === 0 ? 'border-gold' : 'border-espresso/15'} shrink-0 hover:border-gold transition-all"
        data-thumb-src="${imgUrl}"
      >
        <img src="${imgUrl}" class="w-full h-full object-cover">
      </button>
    `).join('');

    galleryStrip.querySelectorAll('.qv-thumb-btn').forEach((thumb) => {
      thumb.addEventListener('click', () => {
        galleryStrip.querySelectorAll('.qv-thumb-btn').forEach((t) => {
          t.classList.remove('border-gold');
          t.classList.add('border-espresso/15');
        });
        thumb.classList.add('border-gold');
        thumb.classList.remove('border-espresso/15');

        const newSrc = thumb.getAttribute('data-thumb-src');
        if (mainImg) {
          gsap.to(mainImg, {
            opacity: 0.5,
            duration: 0.15,
            onComplete: () => {
              mainImg.src = newSrc;
              gsap.to(mainImg, { opacity: 1, duration: 0.25 });
            }
          });
        }
      });
    });
  }
}

function closeQuickViewModal() {
  const modal = document.getElementById('quickview-modal');
  const content = document.getElementById('quickview-modal-content');
  if (!modal) return;

  if (content) {
    gsap.to(content, { scale: 0.95, y: 15, duration: 0.25, ease: 'power2.in' });
  }

  modal.classList.add('opacity-0');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 280);
}

function initCatalogCollection() {
  const grid = document.getElementById('collection-grid');
  const filterPills = document.querySelectorAll('.filter-pill');
  const sortSelect = document.getElementById('collection-sort');

  if (!grid || typeof BAG_CATALOG === 'undefined') return;

  const renderCatalog = () => {
    let items = [...BAG_CATALOG];

    // Filter by Category
    if (currentCategory !== 'all') {
      items = items.filter((b) => b.category === currentCategory);
    }

    // Sort
    if (currentSort === 'price-asc') {
      items.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-desc') {
      items.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'scarcity') {
      items.sort((a, b) => a.stockCount - b.stockCount);
    }

    // Render Cards
    grid.innerHTML = items.map((bag) => {
      const activeColorway = bag.colorways[0];
      const swatchesHtml = bag.colorways.map((cw, idx) => `
        <button 
          type="button"
          class="swatch-dot ${idx === 0 ? 'active' : ''}" 
          data-bag-id="${bag.id}" 
          data-color-id="${cw.id}" 
          style="background-color: ${cw.hex};" 
          title="${cw.name}"
          data-cursor="${cw.name.split(' ')[0].toUpperCase()}"
        ></button>
      `).join('');

      return `
        <article class="product-card-luxury bg-sand/35 border border-gold/20 rounded-2xl p-4 flex flex-col justify-between overflow-hidden group relative" data-bag-id="${bag.id}" data-active-color="${activeColorway.id}">
          
          <!-- Top Badges -->
          <div class="flex items-center justify-between mb-1">
            <span class="text-[9px] uppercase font-sans tracking-widest text-gold font-bold px-2 py-0.5 rounded-full bg-white/90 border border-gold/25">
              ${bag.editionTag}
            </span>
            <span class="text-[9px] font-mono text-espresso/60 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full ${bag.stockCount <= 3 ? 'bg-rose-600 animate-ping' : 'bg-amber-600'}"></span>
              ${bag.stockCount} left
            </span>
          </div>

          <!-- Dual-Image Crossfade Container -->
          <div class="img-crossfade-wrap w-full aspect-[4/5] rounded-xl my-3 relative flex items-center justify-center cursor-pointer group/img" data-action="quickview" data-bag-id="${bag.id}">
            <img src="${activeColorway.primaryImg}" alt="${bag.name}" class="img-crossfade-primary w-full h-full object-cover rounded-xl select-none" loading="lazy">
            <img src="${activeColorway.secondaryImg}" alt="${bag.name} Secondary Angle" class="img-crossfade-secondary w-full h-full object-cover rounded-xl select-none" loading="lazy">
            
            <!-- Quick View Hover Floating Pill -->
            <button class="btn-card-quickview absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full glass-dark text-alabaster text-[10px] font-sans tracking-widest uppercase opacity-0 translate-y-2 group-hover/img:opacity-100 group-hover/img:translate-y-0 transition-all duration-300 shadow-xl border border-gold/40 flex items-center gap-1.5 whitespace-nowrap z-20 hover:bg-gold hover:text-obsidian" data-action="quickview" data-bag-id="${bag.id}" data-cursor="VIEW">
              <svg class="w-3.5 h-3.5 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>Quick View</span>
            </button>
          </div>

          <!-- Card Bottom Meta -->
          <div>
            <!-- Swatches row -->
            <div class="flex items-center justify-between py-1 mb-2">
              <div class="flex items-center gap-2">
                ${swatchesHtml}
              </div>
              <span class="card-color-label text-[10px] font-sans text-espresso/60 truncate max-w-[130px]">
                ${activeColorway.name}
              </span>
            </div>

            <!-- Title & Price -->
            <div class="flex items-start justify-between gap-2">
              <h3 class="font-serif text-lg text-obsidian font-medium group-hover:text-gold transition-colors duration-200">
                ${bag.name}
              </h3>
              <span class="font-serif font-semibold text-obsidian shrink-0">
                ${bag.priceDisplay}
              </span>
            </div>

            <!-- Fits Devices -->
            <p class="text-[11px] font-sans text-espresso/50 mt-1 line-clamp-1">
              ${bag.fitsDevices}
            </p>

            <!-- Reserve Allocation CTA -->
            <button class="btn-card-add btn-luxury btn-luxury-gold w-full mt-3 py-2.5 rounded-xl text-[10px] font-sans font-semibold tracking-widest-luxury uppercase shadow-sm flex items-center justify-center gap-1.5" data-action="add-to-bag" data-bag-id="${bag.id}" data-cursor="RESERVE">
              <span>Reserve Allocation</span>
            </button>
          </div>

        </article>
      `;
    }).join('');

    // Animate cards reveal with GSAP
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(
        grid.children,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'power2.out' }
      );
    }

    // Attach Swatch Click Handlers
    grid.querySelectorAll('.swatch-dot').forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const bagId = dot.getAttribute('data-bag-id');
        const colorId = dot.getAttribute('data-color-id');
        const card = grid.querySelector(`article[data-bag-id="${bagId}"]`);
        if (!card) return;

        const bag = BAG_CATALOG.find((b) => b.id === bagId);
        if (!bag) return;

        const colorway = bag.colorways.find((cw) => cw.id === colorId);
        if (!colorway) return;

        // Update card's active color attribute
        card.setAttribute('data-active-color', colorId);

        // Update images with smooth fade
        const primaryImg = card.querySelector('.img-crossfade-primary');
        const secondaryImg = card.querySelector('.img-crossfade-secondary');
        const colorLabel = card.querySelector('.card-color-label');

        if (primaryImg && secondaryImg) {
          gsap.to([primaryImg, secondaryImg], {
            opacity: 0.4,
            duration: 0.15,
            onComplete: () => {
              primaryImg.src = colorway.primaryImg;
              secondaryImg.src = colorway.secondaryImg;
              gsap.to(primaryImg, { opacity: 1, duration: 0.3 });
              gsap.to(secondaryImg, { opacity: 0, duration: 0.3 });
            }
          });
        }

        if (colorLabel) {
          colorLabel.textContent = colorway.name;
        }

        // Update active class on dots
        card.querySelectorAll('.swatch-dot').forEach((d) => d.classList.remove('active'));
        dot.classList.add('active');
      });
    });

    // Attach Quick View Triggers
    grid.querySelectorAll('[data-action="quickview"]').forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const bagId = trigger.getAttribute('data-bag-id');
        const card = grid.querySelector(`article[data-bag-id="${bagId}"]`);
        const activeColorId = card ? card.getAttribute('data-active-color') : null;
        openQuickViewModal(bagId, activeColorId);
      });
    });

    // Attach Add to Bag Triggers
    grid.querySelectorAll('[data-action="add-to-bag"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const bagId = btn.getAttribute('data-bag-id');
        const card = grid.querySelector(`article[data-bag-id="${bagId}"]`);
        const activeColorId = card ? card.getAttribute('data-active-color') : null;

        const bag = BAG_CATALOG.find((b) => b.id === bagId);
        if (!bag) return;

        const colorway = bag.colorways.find((cw) => cw.id === activeColorId) || bag.colorways[0];

        // Button micro-interaction
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span>ALLOCATED ✦</span>`;
        btn.classList.add('bg-gold', 'text-obsidian');

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('bg-gold', 'text-obsidian');
        }, 1500);

        addToPrivateBag(bag, colorway);
      });
    });

    // Reattach custom cursor hover
    attachCursorTargets();
  };

  // Filter Pills Events
  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-category');
      renderCatalog();
    });
  });

  // Sort Dropdown Event
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderCatalog();
    });
  }

  // Initial render
  renderCatalog();
}

/* ==========================================================================
   9. PHASE 2: LUXURY QUICK-VIEW & MATERIAL INSPECTOR MODAL
   ========================================================================== */
let activeModalBag = null;
let activeModalColorway = null;

function initQuickViewModal() {
  const modal = document.getElementById('quickview-modal');
  const overlay = document.getElementById('quickview-overlay');
  const closeBtn = document.getElementById('close-quickview-modal');
  const addToBagBtn = document.getElementById('qv-add-to-bag');

  if (!modal) return;

  if (closeBtn) closeBtn.addEventListener('click', closeQuickViewModal);
  if (overlay) overlay.addEventListener('click', closeQuickViewModal);

  // Accordion Toggle Handlers
  modal.querySelectorAll('.accordion-header').forEach((header) => {
    header.addEventListener('click', () => {
      const parent = header.closest('.accordion-item');
      if (!parent) return;

      const isOpen = parent.classList.contains('open');
      // Close other accordions for sleek editorial feel
      modal.querySelectorAll('.accordion-item').forEach((item) => item.classList.remove('open'));

      if (!isOpen) {
        parent.classList.add('open');
      }
    });
  });

  // Add to Bag inside Modal
  if (addToBagBtn) {
    addToBagBtn.addEventListener('click', () => {
      if (activeModalBag && activeModalColorway) {
        addToPrivateBag(activeModalBag, activeModalColorway);
        closeQuickViewModal();
      }
    });
  }
}

function openQuickViewModal(bagId, colorwayId) {
  const modal = document.getElementById('quickview-modal');
  const content = document.getElementById('quickview-modal-content');
  if (!modal || typeof BAG_CATALOG === 'undefined') return;

  const bag = BAG_CATALOG.find((b) => b.id === bagId);
  if (!bag) return;

  activeModalBag = bag;
  activeModalColorway = bag.colorways.find((cw) => cw.id === colorwayId) || bag.colorways[0];

  // Populate Header & Text
  document.getElementById('qv-edition-tag').textContent = bag.editionTag;
  document.getElementById('qv-stock-status').textContent = bag.stockStatus;
  document.getElementById('qv-title').textContent = bag.name;
  document.getElementById('qv-price').textContent = bag.priceDisplay;
  document.getElementById('qv-desc').textContent = bag.description;

  // Populate Accordion Data
  document.getElementById('qv-acc-dim').textContent = bag.dimensions;
  document.getElementById('qv-acc-strap').textContent = bag.strapDrop;
  document.getElementById('qv-acc-weight').textContent = bag.weight;
  document.getElementById('qv-acc-fits').textContent = bag.fitsDevices;
  document.getElementById('qv-acc-origin').textContent = bag.origin;
  document.getElementById('qv-acc-tannery').textContent = bag.tannery;
  document.getElementById('qv-acc-hardware').textContent = bag.hardware;
  document.getElementById('qv-acc-care').textContent = bag.careGuide;

  // Proportional Size Visualization
  document.getElementById('qv-fits-device').textContent = `Fits: ${bag.fitsDevices.split(',')[0]}`;
  document.getElementById('qv-dimensions-summary').textContent = bag.dimensions.split('(')[0];
  document.getElementById('qv-weight-summary').textContent = `Weight: ${bag.weight}`;

  // Update Colorways & Gallery
  renderModalColorwaysAndGallery();

  // Reveal Modal with GSAP
  modal.classList.remove('hidden');
  setTimeout(() => {
    modal.classList.remove('opacity-0');
    if (content) {
      gsap.fromTo(content, { scale: 0.94, y: 20 }, { scale: 1, y: 0, duration: 0.4, ease: 'power3.out' });
    }
  }, 10);

  attachCursorTargets();
}

function renderModalColorwaysAndGallery() {
  if (!activeModalBag || !activeModalColorway) return;

  const mainImg = document.getElementById('qv-main-img');
  const galleryStrip = document.getElementById('qv-gallery-strip');
  const swatchList = document.getElementById('qv-swatch-list');
  const colorNameLabel = document.getElementById('qv-color-name');

  // Set initial main image
  if (mainImg) {
    mainImg.src = activeModalColorway.primaryImg;
  }
  if (colorNameLabel) {
    colorNameLabel.textContent = `${activeModalColorway.name} (${activeModalColorway.leatherType})`;
  }

  // Render Swatches
  if (swatchList) {
    swatchList.innerHTML = activeModalBag.colorways.map((cw) => `
      <button 
        type="button"
        class="swatch-dot ${cw.id === activeModalColorway.id ? 'active' : ''}" 
        style="background-color: ${cw.hex};" 
        title="${cw.name}"
        data-qv-color="${cw.id}"
      ></button>
    `).join('');

    swatchList.querySelectorAll('.swatch-dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        const cId = dot.getAttribute('data-qv-color');
        activeModalColorway = activeModalBag.colorways.find((c) => c.id === cId);
        renderModalColorwaysAndGallery();
      });
    });
  }

  // Render Thumbnails Gallery
  if (galleryStrip) {
    const images = activeModalColorway.gallery || [activeModalColorway.primaryImg, activeModalColorway.secondaryImg];
    galleryStrip.innerHTML = images.map((imgUrl, i) => `
      <button 
        type="button"
        class="qv-thumb-btn w-16 h-16 rounded-xl overflow-hidden border-2 ${i === 0 ? 'border-gold' : 'border-espresso/15'} shrink-0 hover:border-gold transition-all"
        data-thumb-src="${imgUrl}"
      >
        <img src="${imgUrl}" class="w-full h-full object-cover">
      </button>
    `).join('');

    galleryStrip.querySelectorAll('.qv-thumb-btn').forEach((thumb) => {
      thumb.addEventListener('click', () => {
        galleryStrip.querySelectorAll('.qv-thumb-btn').forEach((t) => {
          t.classList.remove('border-gold');
          t.classList.add('border-espresso/15');
        });
        thumb.classList.add('border-gold');
        thumb.classList.remove('border-espresso/15');

        const newSrc = thumb.getAttribute('data-thumb-src');
        if (mainImg) {
          gsap.to(mainImg, {
            opacity: 0.5,
            duration: 0.15,
            onComplete: () => {
              mainImg.src = newSrc;
              gsap.to(mainImg, { opacity: 1, duration: 0.25 });
            }
          });
        }
      });
    });
  }
}

function closeQuickViewModal() {
  const modal = document.getElementById('quickview-modal');
  const content = document.getElementById('quickview-modal-content');
  if (!modal) return;

  if (content) {
    gsap.to(content, { scale: 0.95, y: 15, duration: 0.25, ease: 'power2.in' });
  }

  modal.classList.add('opacity-0');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 280);
}

