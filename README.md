# 👜 NISHU LUXE (BY NITASHA) — Full-Stack E-Commerce Store

[![Python](https://img.shields.io/badge/Python-3.13+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3.0+-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vibe Coding](https://img.shields.io/badge/Vibe_Coding-Club_Submission-FF4081?style=for-the-badge)](https://github.com/)

> **A high-converting, luxury e-commerce bag storefront tailored for Pakistan.**  
> Designed & Developed by **Nitasha (Nishu)** for the **Academic E-Commerce Project & Vibe Coding Club Evaluation**.

---

## 🌟 Project Overview

**NISHU LUXE** is a commercial online bag store inspired by modern luxury flagships (Zara, ASOS, Loewe, and Bottega Veneta). It pairs a visual, tactile storefront with an asynchronous Python FastAPI and SQLite database backend.

The platform provides a shopping experience in **Pakistani Rupees (PKR / Rs.)**, offering live inventory management, real-time client-side search, interactive color swatches, a slide-out cart drawer with dynamic delivery tiers, and localized Pakistani checkout options (Cash on Delivery, JazzCash/EasyPaisa, Bank Transfer).

---

## ✨ Key Features

### 🛍️ Storefront & Catalog
* **12 Verified Bags Catalog**: Curated collection across 5 product lines: *Tote Bags, Crossbody & Shoulder, Luxury Handbags, Backpacks, and Travel Duffels*.
* **Real PKR (Rs.) Pricing**: Realistic market pricing from `Rs. 4,500` to `Rs. 16,500` with crossed-out original prices and instant savings pills (e.g. `Save Rs. 4,600`).
* **Visual Cards & Micro-interactions**: Hover zoom effect, wishlist heart toggles, status pills (`BESTSELLER`, `NEW`, `SALE`, `-34% OFF`), and interactive color swatches that swap selected color labels dynamically.
* **Automatic Image Fallback**: Every product image includes an `onerror` handler pointing to high-res backup storage so no broken image links appear.

### 🔍 Discovery & Filtering
* **Live Real-time Search**: Client-side search engine filtering through titles, categories, and full product descriptions as you type.
* **Category Tabs with Live Counts**: Real-time count badges dynamically calculated from active inventory.
* **Instant Sorting**: Client-side sort toolbar supporting *Featured*, *Price: Low to High*, *Price: High to Low*, and *Top Rated (★ 5.0)*.

### 🛒 Slide-Out Cart & Delivery Engine
* **Slide-over Cart Drawer**: Smooth slide-in cart with overlay backdrop and ESC key listener.
* **Free Express Delivery Progress Meter**: Automatically calculates progress toward the **`Rs. 10,000`** free shipping threshold across Pakistan.
  * **Subtotal < Rs. 10,000**: Adds standard shipping of `Rs. 500` and displays `"Add Rs. X more to unlock Free Express Delivery!"`.
  * **Subtotal ≥ Rs. 10,000**: Unlocks free nationwide express shipping (`Rs. 0`).
  * **Empty Cart Guard**: Disables the checkout button and resets shipping to `Rs. 0`.
* **Promo Code Engine**: Built-in discount system accepting **`NISHU20`** (and alias `BAG20`) for an instant 20% discount on cart subtotal.

### 🇵🇰 Pakistan Checkout & Printable Receipt
* **Localized Checkout Modal**: Captures customer details formatted for Pakistan (`+92 300 1234567`, Pakistani city selection: Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Peshawar, Multan, Quetta, Sialkot, Gujranwala, Hyderabad).
* **Payment Gateways**:
  1. 💵 **Cash on Delivery (COD)** *(Default)*
  2. 📱 **JazzCash / EasyPaisa**
  3. 🏦 **Bank Transfer (Meezan / HBL / Alfalah)**
  4. 💳 **Credit / Debit Card**
* **Printable Order Confirmation Receipt**: Generates a verified Order ID (`NL-2026-XXXX`), prints barcode graphics, customer shipping coordinates, itemized breakdown, and triggers `@media print` clean browser printing.

### 🎓 Teacher Demo: Admin Add-Bag Modal
* **Interactive Evaluation Feature**: A dedicated **`+ Admin Demo`** modal allows teachers and evaluators to add a new bag directly into the store live during presentations.
* The new bag is instantly added to the storefront grid, increments category counters, and is persisted to both the FastAPI SQLite database and client `localStorage`.

---

## 🛠️ Tech Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Frontend UI** | HTML5, Tailwind CSS (CDN) | Responsive, mobile-first commercial store layout |
| **Client Engine** | Vanilla JavaScript (ES6+ Class) | Single-source state manager with offline fallback |
| **Backend API** | Python 3.13+, FastAPI, Uvicorn | Asynchronous RESTful API with CORS & static files |
| **Data Storage** | SQLite3 (WAL Mode) | Thread-safe, auto-seeding relational catalog & orders |
| **Data Validation**| Pydantic v2 | Strict schema validation for catalog items & orders |
| **Typography** | Google Fonts | *Plus Jakarta Sans* (UI/Pricing) & *Playfair Display* (Editorial) |

---

## 📂 Project Architecture

```
School Project/
├── README.md               # Master documentation & quickstart guide
├── PRD.md                  # Product Requirements Document
├── ARCHITECTURE.md         # System architecture & data flow diagrams
├── DESIGN_SYSTEM.md        # UI tokens, color palettes & typography
├── BACKEND_API.md          # REST API specifications & Pydantic schemas
├── TASKS.md                # Development phases from Phase 1 to Phase 4
├── AGENT_RULES.md          # Vibe Coding rules & AI prompt strategy
├── TESTING_QA.md           # Comprehensive test cases & QA matrix
├── backend/
│   ├── database.py         # SQLite engine (nishuluxe_store.db) with auto-seeding
│   ├── main.py             # FastAPI application & StaticFiles server
│   ├── models.py           # Pydantic schemas (BagItem, OrderCreateRequest)
│   ├── requirements.txt    # fastapi, uvicorn, pydantic
│   └── venv/               # Pre-configured Python virtual environment
└── frontend/
    ├── index.html          # Storefront UI, modals, cart drawer & footer
    ├── css/
    │   └── custom.css      # Card lift, hover zoom, swatches, @media print
    └── js/
        ├── app.js          # Unified client store engine (PKR, cart, search)
        ├── animations.js   # GSAP legacy visual transitions (if needed)
        ├── cart.js         # Dedicated cart helper utilities
        └── catalog.js      # Raw catalog dataset reference
```

---

## 🚀 Quickstart Guide

### Option 1: Full-Stack Mode (FastAPI + Frontend) — *Recommended*

This mode serves the frontend directly from FastAPI at `http://127.0.0.1:8000/`, with full SQLite database synchronization.

1. **Open PowerShell** in the project directory:
   ```powershell
   cd "c:\Users\DELL\OneDrive\Pictures\Desktop\School Project"
   ```

2. **Activate Virtual Environment & Run Server**:
   ```powershell
   & "backend\venv\Scripts\python.exe" -m uvicorn main:app --app-dir backend --port 8000 --reload
   ```

3. **Open in Browser**:
   * **Storefront**: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
   * **Interactive API Documentation (Swagger)**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
   * **Alternative API Documentation (ReDoc)**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

---

### Option 2: Frontend Standalone Mode (VS Code Live Server)

If Python is not installed or for quick UI-only reviews:

1. In VS Code, right-click [`frontend/index.html`](file:///c:/Users/DELL/OneDrive/Pictures/Desktop/School%20Project/frontend/index.html).
2. Click **"Open with Live Server"** (runs on `http://127.0.0.1:5500/frontend/index.html`).
3. The store automatically runs with built-in client data, full cart logic, and `localStorage` persistence.

---

## 🎯 Step-by-Step Presentation Walkthrough

When demonstrating this project for academic grading or club submission:

1. **Hero & Flash Sale**: Show the Pakistani Flash Sale badge with the ticking countdown timer and the `"Starting at just Rs. 4,500"` callout.
2. **Catalog & Swatches**: Hover over bags to demonstrate image zoom, click color swatches (e.g. *Cognac Brown*, *Obsidian Black*) to see color labels change in real time.
3. **Live Search**: Type `"tote"` or `"satchel"` into the header search bar to showcase zero-latency filtering.
4. **Dynamic Cart & Delivery**:
   * Add a bag below `Rs. 10,000` (e.g. *Classic Tuscan Tote - Rs. 8,900*). Show the `Rs. 500` shipping fee.
   * Increase quantity to 2: show the shipping switch to **`FREE`** and the green delivery celebration bar.
5. **Promo Code**: Apply promo code **`NISHU20`** for a 20% discount.
6. **Checkout & Printable Receipt**: Choose *Cash on Delivery (COD)* or *JazzCash*, complete the order, and show the printable receipt with ID format `NL-2026-XXXX`.
7. **Teacher Admin Feature**: Click **`+ Admin Demo`** to add a custom bag to SQLite live.

---

## 👩‍💻 Author & Credits

* **Lead Designer & Full-Stack Developer**: **Nitasha (Nishu)**
* **Project**: Academic E-Commerce Project & Vibe Coding Club Submission
* **License**: MIT Open Source License (2026)

