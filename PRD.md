# 📋 Product Requirements Document (PRD) — NISHU LUXE

**Product Name:** NISHU LUXE (BY NITASHA)  
**Version:** 2.1.0 (Pakistan E-Commerce Edition)  
**Author:** Nitasha (Nishu)  
**Target Market:** Pakistan E-Commerce & Academic Evaluation  
**Status:** Complete / Production-Ready  

---

## 1. Executive Summary & Problem Statement

### 1.1 The Problem
In the Pakistani online retail landscape, fashion consumers seeking luxury and designer handbags often face:
* Cluttered, unintuitive storefronts with slow server-rendered search.
* Currency ambiguities (pricing shown in USD or outdated conversion rates).
* Lack of flexible local payment methods (inability to choose Cash on Delivery, JazzCash, or EasyPaisa).
* Unreliable product visualization with broken image links and non-interactive swatches.

### 1.2 The Solution
**NISHU LUXE** delivers an e-commerce handbag storefront inspired by high-end international flagships (Zara, ASOS, Loewe) specifically adapted for Pakistan. It offers transparent pricing in **Pakistani Rupees (PKR / Rs.)**, instant client-side search and category filtering, responsive color swatches, a slide-out cart with a **`Rs. 10,000`** free delivery milestone, and a Pakistan-tailored checkout with printable receipts.

---

## 2. Target Audience & User Personas

### 2.1 Target Demographics
* **Location:** Major metropolitan and tier-2 cities across Pakistan (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Peshawar, Multan, Quetta, Sialkot, Gujranwala).
* **Demographics:** Working professionals, university students, and fashion-conscious gift buyers aged 18–45.
* **Preferred Payment Habits:** Cash on Delivery (COD) for first-time purchases, JazzCash/EasyPaisa for mobile-first shoppers, and direct bank transfers.

### 2.2 User Personas
| Persona | Background | Primary Goal | Key Frustration |
| :--- | :--- | :--- | :--- |
| **Ayesha (University Student)** | University student in Islamabad, loves trending tote bags for campus. | Find a stylish, durable leather tote within `Rs. 9,000`. | Hidden delivery fees and slow checkout forms. |
| **Zainab (Corporate Professional)** | Executive in Karachi, needs structured laptop-compatible satchels. | Inspect bag dimensions, colorways, and pay via Bank Transfer or COD. | Broken product preview images and foreign currency pricing. |
| **Dr. Tariq (Academic Evaluator)** | Computer Science lecturer assessing full-stack student project. | Verify clean client-server architecture, database persistence, and CRUD ability. | Non-functional demo buttons or complex installation steps. |

---

## 3. User Stories

### Shopper Stories
* **US-01 (Catalog Browsing):** As a shopper, I want to view a commercial grid of bags categorized by type (Totes, Crossbodies, Handbags, Backpacks, Duffels) so that I can quickly find what I want.
* **US-02 (Live Search):** As a shopper, I want to type keywords into a search bar and see the product grid filter in real time without reloading the page.
* **US-03 (Color Inspection):** As a shopper, I want to click interactive color swatches on the bag card to preview different leather finishes before adding to cart.
* **US-04 (Cart Management):** As a shopper, I want a slide-out cart drawer where I can adjust quantities, remove items, and see my live subtotal in PKR.
* **US-05 (Free Delivery Threshold):** As a shopper, I want a visual progress bar showing how much more I need to spend to unlock free express delivery across Pakistan (`Rs. 10,000` goal).
* **US-06 (Promo Discount):** As a shopper, I want to enter promo code `NISHU20` to receive 20% off my subtotal immediately.
* **US-07 (Checkout & Confirmation):** As a shopper, I want to input my Pakistani phone number and city, choose Cash on Delivery or JazzCash, and view an itemized printable order confirmation receipt.

### Evaluator / Admin Stories
* **US-08 (Live Product Seeding):** As a teacher/evaluator, I want to click `+ Admin Demo` and add a new bag with custom title, price, and image to prove backend database connectivity.

---

## 4. Functional Requirements

### 4.1 Header & Navigation
| ID | Requirement | Priority | Acceptance Criteria |
| :--- | :--- | :--- | :--- |
| **FR-01** | Top Promo Bar | High | Must display free shipping threshold over `Rs. 10,000` and promo code `NISHU20`. |
| **FR-02** | Brand Identity | High | Display logo `NISHU LUXE.` with subtitle `BY NITASHA`. |
| **FR-03** | Real-Time Search | High | Filter products by title, category, and description instantly on `input` event. |
| **FR-04** | Wishlist Counter | Medium | Heart badge tracks number of saved items, persisted to `localStorage`. |
| **FR-05** | Cart Counter Badge | High | Displays total quantity of items and dynamic subtotal formatted as `Rs. X,XXX`. |

### 4.2 Product Showcase & Catalog
| ID | Requirement | Priority | Acceptance Criteria |
| :--- | :--- | :--- | :--- |
| **FR-06** | 12 Verified Bags | High | 12 distinct items across 5 categories with authentic bag imagery. |
| **FR-07** | Image Fallback Guard | High | Every `<img>` tag must include `onerror` fallback to prevent broken thumbnails. |
| **FR-08** | PKR Currency Formatting | High | Display prices as `Rs. X,XXX` with original crossed-out prices and savings pills. |
| **FR-09** | Color Swatches | Medium | Clickable color dots that update the selected color label on the card. |
| **FR-10** | Quick View Modal | Medium | Modal showing high-res image, stock availability, full description, and direct Add-to-Cart. |

### 4.3 Slide-Out Cart & Delivery Engine
| ID | Requirement | Priority | Acceptance Criteria |
| :--- | :--- | :--- | :--- |
| **FR-11** | Slide-Over Drawer | High | Slides in smoothly from right when clicking cart button or adding an item. |
| **FR-12** | Quantity Controls | High | `+` and `-` buttons update quantity; reducing to 0 removes item. |
| **FR-13** | Delivery Fee Logic | High | If cart empty: shipping = `Rs. 0` and checkout disabled.<br>If subtotal < `Rs. 10,000`: shipping = `Rs. 500`.<br>If subtotal ≥ `Rs. 10,000`: shipping = `FREE`. |
| **FR-14** | Promo Code Engine | High | Code `NISHU20` (and `BAG20`) grants exact 20% discount on cart subtotal. |

### 4.4 Checkout & Order Confirmation
| ID | Requirement | Priority | Acceptance Criteria |
| :--- | :--- | :--- | :--- |
| **FR-15** | Customer Form | High | Validates full name, email, Pakistani phone (`+92`), city dropdown, and address. |
| **FR-16** | Payment Selector | High | 4 options: COD (default), JazzCash/EasyPaisa, Bank Transfer, Card. |
| **FR-17** | Order Persistence | High | Posts payload to `POST /api/orders`, decrements SQLite stock, falls back gracefully if server offline. |
| **FR-18** | Printable Receipt | High | Modal showing generated reference `NL-2026-XXXX`, barcode, customer info, and `@media print` button. |

### 4.5 Teacher Admin Demo
| ID | Requirement | Priority | Acceptance Criteria |
| :--- | :--- | :--- | :--- |
| **FR-19** | Dynamic Product Insertion | High | Modal accepts Bag Name, Category, Price (Rs.), Original Price, Badge, and Image URL; adds card to store and database immediately. |

---

## 5. Non-Functional Requirements (NFR)

* **Performance:** First Contentful Paint (FCP) < 1.0s. Zero-latency client search (< 16ms render cycle).
* **Portability (Dual Hosting):** Must work seamlessly whether launched via Python FastAPI on port 8000 OR via VS Code Live Server on port 5500.
* **Resilience:** If the FastAPI backend is offline or stopped, the frontend continues operating 100% seamlessly using built-in fallback data and `localStorage`.
* **Print Styling:** Print stylesheet (`@media print`) must hide web UI chrome and cleanly format the order confirmation receipt on a single standard A4 sheet.

---

## 6. Non-Goals (Out of Scope)

* **Real Credit Card Processing:** No real merchant API calls (Stripe/Authorize.net) are executed; transactions are simulated safely for educational demonstration.
* **User Authentication / Passwords:** No persistent multi-user login or session management is implemented.
* **SMS Gateway Integration:** Real OTP/SMS notifications are not sent; receipts are displayed directly on-screen.

---

## 7. Acceptance Criteria Checklist

- [x] Website name displays "NISHU LUXE" with subtitle "BY NITASHA".
- [x] All 12 products feature verified handbag/tote/backpack/duffel photos.
- [x] All prices and calculations operate in Pakistani Rupees (`Rs.`).
- [x] Promo code `NISHU20` applies an exact 20% discount.
- [x] Free delivery unlocks at `Rs. 10,000`; otherwise `Rs. 500` delivery is charged.
- [x] Checkout modal supports Pakistani cities and payment methods (COD, JazzCash).
- [x] Printable receipt displays generated ID `NL-2026-XXXX`.
- [x] Evaluator `+ Admin Demo` inserts products dynamically into SQLite.

