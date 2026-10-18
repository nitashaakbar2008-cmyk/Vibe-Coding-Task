/**
 * ATELIER VÉLÈNE — Curated Luxury Catalog & Inspector Engine
 * 8 Bespoke Silhouettes with Multi-Colorways, Provenance Dossiers & Size Comparisons.
 */

const BAG_CATALOG = [
  {
    id: 'grand-archetype',
    name: 'Le Grand Archétype',
    category: 'totes',
    price: 2850,
    priceDisplay: '$2,850',
    editionTag: 'Limited Edition • 150 Pieces',
    editionNumber: '048 / 150',
    stockCount: 4,
    stockStatus: 'Only 4 allocations remain in vault',
    dimensions: '42 × 32 × 16 cm (16.5" × 12.6" × 6.3")',
    strapDrop: '24 cm (9.4")',
    weight: '1,180 g (unlined temper)',
    fitsDevices: '16" MacBook Pro, A4 Archival Dossier, iPad Pro',
    origin: 'Santa Croce sull’Arno, Tuscany, Italy',
    tannery: 'Conceria Walpier (Consorzio Vera Pelle Conciata al Vegetale)',
    hardware: 'Solid Piedmontese brass with 24K PVD brushed gold barrier',
    careGuide: 'Condition annually with organic beeswax. Protect from direct deluge. Allow natural honey patina to develop over generations.',
    description: 'Our iconic architectural flagship. Hand-sculpted from 2.4mm full-grain Tuscan Vachetta, unlined to preserve the raw leather temper, and secured with hand-milled solid brass fixtures.',
    sizeRatio: { widthPct: 88, heightPct: 76, deviceName: '16" MacBook Pro' },
    colorways: [
      {
        id: 'sienna',
        name: 'Sienna Vachetta',
        leatherType: '2.4mm Tuscan Vegetable-Tanned Vachetta',
        hex: '#B56538',
        borderHex: '#D48558',
        primaryImg: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
        secondaryImg: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85',
          'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85',
          'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85'
        ]
      },
      {
        id: 'obsidian-croco',
        name: 'Obsidian Jet Croco',
        leatherType: 'Heat-Embossed Italian Calfskin with Waxed Sheen',
        hex: '#1C1B1B',
        borderHex: '#4A4A4A',
        primaryImg: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=1000&q=80',
        secondaryImg: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=1200&q=85',
          'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85',
          'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1200&q=85'
        ]
      }
    ]
  },
  {
    id: 'petite-minaudiere',
    name: 'La Petite Minaudière',
    category: 'mini',
    price: 1650,
    priceDisplay: '$1,650',
    editionTag: 'Bespoke Evening Run',
    editionNumber: '022 / 080',
    stockCount: 8,
    stockStatus: '8 allocations remaining',
    dimensions: '19 × 14 × 7 cm (7.5" × 5.5" × 2.8")',
    strapDrop: '56 cm (22") adjustable curb chain',
    weight: '440 g',
    fitsDevices: 'iPhone 16 Pro Max, Lipstick, Card Case, Car Keys',
    origin: 'Scandicci, Florence, Italy',
    tannery: 'Conceria Badalassi Carlo',
    hardware: '24K brushed gold diamond-cut curb chain and magnetic lock',
    careGuide: 'Buff gently with dry microfiber cloth. Keep stored in archival suede pouch.',
    description: 'An architectural micro-silhouette engineered for nocturnal gallery vernissages. Features a cantilevered turn-lock clasp and an unyielding beveled frame.',
    sizeRatio: { widthPct: 45, heightPct: 40, deviceName: 'iPhone 16 Pro Max' },
    colorways: [
      {
        id: 'sahara-suede',
        name: 'Sahara Velour Suede',
        leatherType: 'Reverse Tuscan Calf Suede with Water-Repellent Treatment',
        hex: '#C9A779',
        borderHex: '#E2C498',
        primaryImg: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=80',
        secondaryImg: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1200&q=85',
          'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85'
        ]
      },
      {
        id: 'emerald-pebbled',
        name: 'Emerald Forest Pebbled',
        leatherType: 'Full-Grain Shrunken Pebble Grain Calfskin',
        hex: '#1D3B2B',
        borderHex: '#35634B',
        primaryImg: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
        secondaryImg: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85',
          'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1200&q=85'
        ]
      }
    ]
  },
  {
    id: 'architecte-clutch',
    name: 'L’Architecte Structured Clutch',
    category: 'limited',
    price: 2100,
    priceDisplay: '$2,100',
    editionTag: 'Numbered Archive • 50 Pieces',
    editionNumber: '014 / 050',
    stockCount: 2,
    stockStatus: 'Strictly 2 allocations left',
    dimensions: '28 × 16 × 6 cm (11.0" × 6.3" × 2.4")',
    strapDrop: 'Handheld or detachable wrist loop',
    weight: '520 g',
    fitsDevices: 'iPad Mini, iPhone 16 Pro Max, Passport, Montblanc Pen',
    origin: 'Piedmont Workshop, Italy',
    tannery: 'Conceria La Perla Azzurra',
    hardware: 'Milled architectural brass bar with concealed magnetic closure',
    careGuide: 'Keep conditioned with natural lanolin cream. Store away from artificial heating.',
    description: 'Sculpted from a single seamless fold of 2.2mm Box Calf. The brutalist brass spine serves as both structural backbone and ergonomic grip.',
    sizeRatio: { widthPct: 62, heightPct: 48, deviceName: 'iPad Mini' },
    colorways: [
      {
        id: 'espresso-box',
        name: 'Espresso Box Calf',
        leatherType: 'Ultra-Smooth Glazed Box Calfskin with Mirror Luster',
        hex: '#2C221E',
        borderHex: '#524037',
        primaryImg: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
        secondaryImg: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1000&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
          'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1200&q=85'
        ]
      },
      {
        id: 'craie-alabaster',
        name: 'Craie Alabaster Bone',
        leatherType: 'Aniline Dyed Natural Chalk Calfskin',
        hex: '#EBE5D8',
        borderHex: '#FBF9F4',
        primaryImg: 'https://images.unsplash.com/photo-1583623733237-4d5764a9dc82?auto=format&fit=crop&w=1000&q=80',
        secondaryImg: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1583623733237-4d5764a9dc82?auto=format&fit=crop&w=1200&q=85',
          'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85'
        ]
      }
    ]
  },
  {
    id: 'voyageur-48h',
    name: 'Le Grand Voyageur 48H',
    category: 'totes',
    price: 3400,
    priceDisplay: '$3,400',
    editionTag: 'Master Guild Release',
    editionNumber: '007 / 030',
    stockCount: 3,
    stockStatus: 'Only 3 allocations remain in reserve',
    dimensions: '52 × 34 × 24 cm (20.5" × 13.4" × 9.4")',
    strapDrop: '18 cm (handles) + 48 cm detachable bridle strap',
    weight: '2,100 g',
    fitsDevices: 'Complete 48-Hour Wardrobe, 16" Laptop, Dopp Kit',
    origin: 'Florence Maroquinerie Studio, Italy',
    tannery: 'Conceria Walpier (Double-Butt Vachetta)',
    hardware: 'Heavy gauge solid brass double zips with padlocked pulls',
    careGuide: 'Professional leather spa conditioning recommended every 24 months. Archival dust bag included.',
    description: 'The definitive transatlantic travel silhouette. Hand-stitched with waxed French linen thread and reinforced with an internal beechwood bottom arch.',
    sizeRatio: { widthPct: 100, heightPct: 90, deviceName: 'Cabin Overhead Standard' },
    colorways: [
      {
        id: 'heritage-cognac',
        name: 'Heritage Cognac Amber',
        leatherType: '2.6mm Waxed Full-Grain Harness Leather',
        hex: '#8B4513',
        borderHex: '#B26228',
        primaryImg: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
        secondaryImg: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1000&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85',
          'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1200&q=85'
        ]
      },
      {
        id: 'noir-shadow',
        name: 'Noir Shadow Matte',
        leatherType: 'Deep Drum-Dyed Tuscan Vachetta',
        hex: '#141414',
        borderHex: '#383838',
        primaryImg: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1000&q=80',
        secondaryImg: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1200&q=85',
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85'
        ]
      }
    ]
  },
  {
    id: 'cylindre-crossbody',
    name: 'Le Cylindre Micro Crossbody',
    category: 'mini',
    price: 1420,
    priceDisplay: '$1,420',
    editionTag: 'Architectural Geometric',
    editionNumber: '035 / 100',
    stockCount: 11,
    stockStatus: '11 allocations remaining',
    dimensions: '16 × 12 × 8 cm (6.3" × 4.7" × 3.1")',
    strapDrop: '52 cm (20.5") slender leather cord',
    weight: '380 g',
    fitsDevices: 'iPhone Pro, AirPods Max in sleeve, Key Fob',
    origin: 'Scandicci, Florence, Italy',
    tannery: 'Conceria Tempesti',
    hardware: 'Concealed magnetic snap and hand-turned brass finials',
    careGuide: 'Avoid prolonged direct sunlight. Polish with dry cotton pad.',
    description: 'A pure cylindrical volume inspired by modernist column architecture. Seamless circular base joined with double-pass saddle stitching.',
    sizeRatio: { widthPct: 40, heightPct: 42, deviceName: 'iPhone 16 Pro' },
    colorways: [
      {
        id: 'terracotta-clay',
        name: 'Terracotta Rust Clay',
        leatherType: 'Vegetable-Tanned Tuscan Calfskin with Matte Wax',
        hex: '#A85A3F',
        borderHex: '#CE7859',
        primaryImg: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1000&q=80',
        secondaryImg: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1200&q=85',
          'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85'
        ]
      },
      {
        id: 'obsidian-nero',
        name: 'Obsidian Nero',
        leatherType: 'Smooth Satin-Touch Italian Calfskin',
        hex: '#111111',
        borderHex: '#3A3A3A',
        primaryImg: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=1000&q=80',
        secondaryImg: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1000&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=1200&q=85',
          'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1200&q=85'
        ]
      }
    ]
  },
  {
    id: 'flaneur-slouch',
    name: 'Le Sac Flâneur Slouch Tote',
    category: 'totes',
    price: 2450,
    priceDisplay: '$2,450',
    editionTag: 'Unlined Raw Temper',
    editionNumber: '052 / 120',
    stockCount: 6,
    stockStatus: '6 allocations remaining in atelier',
    dimensions: '39 × 36 × 14 cm (15.4" × 14.2" × 5.5")',
    strapDrop: '28 cm (11.0") reinforced shoulder sling',
    weight: '890 g',
    fitsDevices: '14" MacBook Pro, Water Carafe, Sketchbook, Scarf',
    origin: 'Santa Croce sull’Arno, Italy',
    tannery: 'Conceria Il Ponte',
    hardware: 'Brushed gold interior key lanyard snap & stud feet',
    careGuide: 'Embrace the organic suppleness. Natural creasing enhances character.',
    description: 'Designed for effortless everyday movement. Cut from supple dry-milled Vachetta that drapes organically while maintaining structural balance.',
    sizeRatio: { widthPct: 82, heightPct: 78, deviceName: '14" MacBook Pro' },
    colorways: [
      {
        id: 'hazelnut-moka',
        name: 'Muted Hazelnut Moka',
        leatherType: 'Dry-Milled Tuscan Nubuck Grain with Silky Drape',
        hex: '#6E533F',
        borderHex: '#94745C',
        primaryImg: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=80',
        secondaryImg: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=85',
          'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85'
        ]
      },
      {
        id: 'sand-dune',
        name: 'Sand Dune Parchment',
        leatherType: 'Natural Vegetable-Tanned Unfinished Grain',
        hex: '#C2B69D',
        borderHex: '#E2D8C2',
        primaryImg: 'https://images.unsplash.com/photo-1583623733237-4d5764a9dc82?auto=format&fit=crop&w=1000&q=80',
        secondaryImg: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1583623733237-4d5764a9dc82?auto=format&fit=crop&w=1200&q=85',
          'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=85'
        ]
      }
    ]
  },
  {
    id: 'edition-monolithe',
    name: 'L’Édition Monolithe Minaudière',
    category: 'limited',
    price: 3150,
    priceDisplay: '$3,150',
    editionTag: 'Vault Archive • 30 Pieces',
    editionNumber: '003 / 030',
    stockCount: 1,
    stockStatus: 'Critical: Only 1 allocation remaining worldwide',
    dimensions: '22 × 15 × 7 cm (8.7" × 5.9" × 2.8")',
    strapDrop: 'Jewelry snake chain 50 cm or clutch carry',
    weight: '610 g',
    fitsDevices: 'Evening essentials, Monogrammed card sleeve, Fragrance vial',
    origin: 'Piedmont & Florence Joint Atelier, Italy',
    tannery: 'Artisanal Gold Leaf Guild & Walpier Vachetta',
    hardware: 'Solid brass frame hand-gilded in 24-Karat gold leaf',
    careGuide: 'Parchment and gold leaf require gentle handling. White-glove service kit included.',
    description: 'A museum-grade objet d’art. A sculpted solid Italian walnut core hand-wrapped in rare gilded Vachetta, enclosed within a monolithic gold frame.',
    sizeRatio: { widthPct: 50, heightPct: 45, deviceName: 'Evening Minaudière Standard' },
    colorways: [
      {
        id: 'gold-vachetta',
        name: '24K Gilded Gold Leaf Vachetta',
        leatherType: 'Hand-Applied 24K Gold Leaf over Tuscan Vachetta',
        hex: '#C5A059',
        borderHex: '#E8D3A7',
        primaryImg: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80',
        secondaryImg: 'https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=1000&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85',
          'https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=1200&q=85'
        ]
      },
      {
        id: 'obsidian-matte-monolithe',
        name: 'Obsidian Stealth Carbon',
        leatherType: 'Ultra-Matte Mineral Dyed Tuscan Vachetta',
        hex: '#161616',
        borderHex: '#444444',
        primaryImg: 'https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=1000&q=80',
        secondaryImg: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=1200&q=85',
          'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85'
        ]
      }
    ]
  },
  {
    id: 'demi-lune-saddle',
    name: 'La Demi-Lune Asymmetric Saddle',
    category: 'mini',
    price: 1890,
    priceDisplay: '$1,890',
    editionTag: 'Equestrian Heritage',
    editionNumber: '041 / 075',
    stockCount: 7,
    stockStatus: '7 allocations remaining',
    dimensions: '24 × 18 × 8 cm (9.4" × 7.1" × 3.1")',
    strapDrop: '46 cm (18.1") ergonomic curved harness strap',
    weight: '580 g',
    fitsDevices: 'iPhone 16 Pro Max, Sunglasses in hard case, Compact wallet',
    origin: 'Scandicci, Florence, Italy',
    tannery: 'Conceria Montebello',
    hardware: 'Stirrup-inspired solid brass buckles with hand-buffed satin finish',
    careGuide: 'Condition every 6 months. Minor surface scuffs can be buffed with fingertips.',
    description: 'An architectural tribute to Tuscan equestrian saddlery. The organic crescent curve balances effortlessly against the body with dual-point suspension.',
    sizeRatio: { widthPct: 56, heightPct: 50, deviceName: 'Saddle Bag Standard' },
    colorways: [
      {
        id: 'merlot-burgundy',
        name: 'Merlot Tuscan Wine',
        leatherType: 'Glazed Full-Grain Calfskin with Deep Chromatic Depth',
        hex: '#4E1825',
        borderHex: '#7C2E3F',
        primaryImg: 'https://images.unsplash.com/photo-1563903530908-afdd155d057a?auto=format&fit=crop&w=1000&q=80',
        secondaryImg: 'https://images.unsplash.com/photo-1614179689702-355944cd0918?auto=format&fit=crop&w=1000&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1563903530908-afdd155d057a?auto=format&fit=crop&w=1200&q=85',
          'https://images.unsplash.com/photo-1614179689702-355944cd0918?auto=format&fit=crop&w=1200&q=85'
        ]
      },
      {
        id: 'cypress-olive',
        name: 'Cypress Olive Drab',
        leatherType: 'Aniline Veg-Tanned Tuscan Calf with Natural Wax Pull-Up',
        hex: '#5B6347',
        borderHex: '#848F69',
        primaryImg: 'https://images.unsplash.com/photo-1614179689702-355944cd0918?auto=format&fit=crop&w=1000&q=80',
        secondaryImg: 'https://images.unsplash.com/photo-1563903530908-afdd155d057a?auto=format&fit=crop&w=1000&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1614179689702-355944cd0918?auto=format&fit=crop&w=1200&q=85',
          'https://images.unsplash.com/photo-1563903530908-afdd155d057a?auto=format&fit=crop&w=1200&q=85'
        ]
      }
    ]
  }
];

// Export to window for global access
window.BAG_CATALOG = BAG_CATALOG;

// Backend API Integration with Graceful Fallback
const BACKEND_API_BASE = 'http://127.0.0.1:8000';

async function fetchBagsFromBackend() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    
    const response = await fetch(`${BACKEND_API_BASE}/api/bags`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        window.BAG_CATALOG = data;
        console.log('✦ Atelier Vault: Successfully synced live catalog with FastAPI backend.');
        window.dispatchEvent(new CustomEvent('bags:updated', { detail: data }));
        return data;
      }
    }
  } catch (err) {
    console.info('✦ Atelier Vault: Backend offline or unreachable. Using curated local archive fallback.');
  }
  window.dispatchEvent(new CustomEvent('bags:updated', { detail: window.BAG_CATALOG }));
  return window.BAG_CATALOG;
}

window.fetchBagsFromBackend = fetchBagsFromBackend;

// Trigger fetch on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fetchBagsFromBackend);
} else {
  fetchBagsFromBackend();
}


