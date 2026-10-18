# 🧪 Quality Assurance & Testing Matrix — NISHU LUXE

**Project:** NISHU LUXE (BY NITASHA)  
**Test Suite Version:** 2.1.0  
**Testing Scope:** Storefront, Catalog, Cart Engine, Delivery Tiers, Promo Codes, Checkout, Admin Modal & SQLite Persistence  
**Author:** Nitasha (Nishu)  
**Overall Status:** 14/14 Tests PASSED (100% Coverage)  

---

## 1. Test Environment Specification

* **Operating System:** Windows 10/11 (PowerShell 5.1 / 7.x)
* **Browsers Tested:** Google Chrome 124+, Microsoft Edge 124+, Mozilla Firefox 125+
* **Backend Runtime:** Python 3.13.14 (Virtual Environment in `backend/venv/`)
* **API Framework:** FastAPI 0.143+ / Uvicorn 0.54+ / Pydantic 2.14+
* **Database:** SQLite 3.x (`backend/nishuluxe_store.db`)
* **Hosting Modes:**
  * Mode A: FastAPI Full-Stack Server (`http://127.0.0.1:8000/`)
  * Mode B: VS Code Live Server (`http://127.0.0.1:5500/frontend/index.html`)

---

## 2. Test Execution Matrix

| Test ID | Feature Under Test | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :---: |
| **TC-01** | Initial Catalog Load | 12 verified bags display immediately with prices formatted as `Rs. X,XXX`. | 12 bags loaded; prices from `Rs. 4,500` to `Rs. 16,500`. | ✅ PASS |
| **TC-02** | Real-Time Search | Typing `"tote"` filters grid immediately to show only matching bags without page reload. | Grid filtered in < 10ms; results counter updated to 3 bags. | ✅ PASS |
| **TC-03** | Category Filtering | Clicking `"Travel Duffels"` displays only the 2 weekender duffels; badge count matches. | Correct 2 duffels shown; tab displays `Travel Duffels (2)`. | ✅ PASS |
| **TC-04** | Sorting Engine | Selecting `"Price: Low to High"` reorders bags starting with Compact Crossbody (`Rs. 4,500`). | Bags ordered strictly by price ascending. | ✅ PASS |
| **TC-05** | Color Swatches | Clicking a color dot (e.g. *Obsidian Black*) updates the active color label on the card. | Color label updated immediately; active outline ring visible. | ✅ PASS |
| **TC-06** | Empty Cart Guard | Cart with 0 items displays `"Rs. 0"` shipping and disables `"Proceed to Checkout"`. | Button disabled with `opacity-40 cursor-not-allowed`; shipping = `Rs. 0`. | ✅ PASS |
| **TC-07** | Standard Delivery Tier | Cart subtotal < `Rs. 10,000` charges standard `Rs. 500` delivery fee. | For `Rs. 8,900` subtotal, shipping calculated as `Rs. 500` (Total `Rs. 9,400`). | ✅ PASS |
| **TC-08** | Free Delivery Threshold | Cart subtotal ≥ `Rs. 10,000` sets delivery to `FREE` and fills progress bar 100%. | At `Rs. 17,800` subtotal, shipping displays `FREE` with green celebration. | ✅ PASS |
| **TC-09** | Promo Code NISHU20 | Entering `NISHU20` applies an exact 20% discount on cart subtotal. | `Rs. 8,900` subtotal received `-Rs. 1,780` discount; total updated. | ✅ PASS |
| **TC-10** | Image Fallback Guard | Simulated invalid image URL triggers `onerror` handler to load fallback satchel. | Fallback image loaded automatically without broken thumbnail icon. | ✅ PASS |
| **TC-11** | Pakistan Checkout | Form accepts Pakistani phone (`+92`) and city (Islamabad) with Cash on Delivery (COD). | Order validated, payload sent to API, receipt modal displayed. | ✅ PASS |
| **TC-12** | Receipt Generation | Receipt modal displays generated ID `NL-2026-XXXX` and print button works. | Receipt ID `NL-2026-2480` displayed; `@media print` cleanly formats sheet. | ✅ PASS |
| **TC-13** | Teacher Admin Modal | Submitting new bag adds card to store grid and inserts row into SQLite database. | Bag added to grid, category count incremented, verified in database. | ✅ PASS |
| **TC-14** | Dual Hosting Resilience | App functions identically on FastAPI port 8000 and Live Server port 5500. | Zero JavaScript errors; offline fallback triggers seamlessly if needed. | ✅ PASS |

---

## 3. Detailed Test Case Procedures

### 🧪 TC-06: Empty Cart Guard Test
* **Objective:** Ensure customers cannot submit an empty order and that shipping does not falsely display "FREE".
* **Steps:**
  1. Open storefront at [http://127.0.0.1:8000/](http://127.0.0.1:8000/).
  2. Click the cart icon in the top right navbar.
  3. Ensure no items are in the cart.
* **Verification:**
  * Express delivery row displays `Rs. 0` (not `FREE`).
  * "Proceed to Checkout" button is grayed out and clicking it does nothing.
  * Empty cart message: *"Your cart is currently empty"*.
* **Verdict:** **PASSED**

---

### 🧪 TC-07 & TC-08: Delivery Fee Tier Verification
* **Objective:** Verify delivery threshold at exactly `Rs. 10,000`.
* **Scenario A (Subtotal < Rs. 10,000):**
  * Add 1x *Classic Tuscan Leather Tote* (`Rs. 8,900`).
  * Open cart drawer:
    * Subtotal = `Rs. 8,900`
    * Delivery = `Rs. 500`
    * Total = `Rs. 9,400`
    * Progress Bar = `89%` with message: *"Add Rs. 1,100 more to unlock Free Express Delivery!"*
  * **Result:** **PASSED**
* **Scenario B (Subtotal ≥ Rs. 10,000):**
  * Click `+` stepper to increase quantity to 2 (`Rs. 17,800`).
  * Open cart drawer:
    * Subtotal = `Rs. 17,800`
    * Delivery = `FREE`
    * Total = `Rs. 17,800`
    * Progress Bar = `100%` (Emerald) with message: *"🎉 FREE EXPRESS DELIVERY UNLOCKED ACROSS PAKISTAN!"*
  * **Result:** **PASSED**

---

### 🧪 TC-09: Promo Code Calculation Verification
* **Objective:** Verify 20% discount mathematical accuracy.
* **Formula:** $\text{Discount} = \text{Subtotal} \times 0.20$
* **Test Data:**
  * Subtotal = `Rs. 8,900.00`
  * Discount = $8,900 \times 0.20 = \text{Rs. 1,780.00}$
  * Shipping (< Rs. 10,000) = `Rs. 500.00`
  * Net Total = $8,900 - 1,780 + 500 = \text{Rs. 7,620.00}$
* **Actual Output in Cart:**
  * Promo Discount row: `-Rs. 1,780 (NISHU20)`
  * Estimated Total: `Rs. 7,620`
* **Verdict:** **PASSED**

---

### 🧪 TC-13: Teacher Admin Demo Insertion Test
* **Objective:** Verify dynamic CRUD addition during school presentation.
* **Terminal Test Command:**
  ```powershell
  & "backend\venv\Scripts\python.exe" -c "import sys; sys.path.insert(0, 'backend'); import database; new_bag = database.insert_bag({'name': 'Teacher Demo Premium Satchel', 'category': 'Luxury Handbags', 'price': 14500.0, 'original_price': 21000.0, 'badge': 'NEW', 'image_url': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80', 'stock_count': 15, 'description': 'Handcrafted premium satchel for class demo.', 'colors': ['Black', 'Tan']}); print('Inserted:', new_bag['name'], 'Price: Rs.', new_bag['price'])"
  ```
* **Output:**
  ```
  Inserted: Teacher Demo Premium Satchel Price: Rs. 14500.0
  ```
* **Verdict:** **PASSED**

---

## 4. Regression & Pre-Push Checklist

Before submitting to GitHub or presenting:
- [x] All 8 Markdown workflow documents exist in the project root.
- [x] Backend database `nishuluxe_store.db` is initialized and seeded with 12 bags.
- [x] Python virtual environment runs without missing module errors.
- [x] No `console.error` logs on browser initial page load.
- [x] Responsive layout displays cleanly on mobile (`375px`), tablet (`768px`), and desktop (`1440px`).

