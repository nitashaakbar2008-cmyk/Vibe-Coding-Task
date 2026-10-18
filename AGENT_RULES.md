# 🤖 Agent Rules & Vibe Coding Strategy — NISHU LUXE

**Project:** NISHU LUXE (BY NITASHA)  
**Agent Model:** Google DeepMind Gemini 3.8 Flash High (Advanced Agentic Coding)  
**Methodology:** Vibe Coding — Iterative Specification, Proactive Execution & Test-Driven Verification  

---

## 1. Vibe Coding Principles

Vibe Coding is a modern paradigm where a human developer collaborates with an advanced AI coding assistant to design, architect, implement, and verify production software at high velocity. The following foundational rules governed the creation of **NISHU LUXE**:

1. **Autonomous Proactivity**: The AI agent proactively writes code, runs shell commands, verifies HTTP status codes, and diagnoses errors without asking trivial permissions for routine steps.
2. **Deterministic Verification**: Every new feature or fix must be tested immediately via terminal commands (e.g., verifying image headers, testing SQLite queries, testing API endpoints).
3. **Resilience by Design**: The frontend must never crash if the backend server is stopped. Fallback client-side datasets and `localStorage` caching ensure zero downtime.
4. **Preservation of Context**: Maintain documentation integrity, existing comments, and code formatting unless specifically instructed to re-architect.

---

## 2. Agent Prompt Architecture

To produce an e-commerce platform with the polish of **NISHU LUXE**, prompts were structured using a 4-part architectural blueprint:

```
+-------------------------------------------------------------------+
| 1. PERSONA & ROLE DEFINITION                                      |
|    "Act as an award-winning Creative Director & Senior Full-Stack |
|     Engineer..."                                                  |
+-------------------------------------------------------------------+
| 2. CONTEXT & DESIGN LANGUAGE                                      |
|    "Inspiration: Zara / ASOS / Loewe. Warm editorial alabaster,   |
|     deep obsidian (#0F172A), brushed gold accents (#D97706)..."   |
+-------------------------------------------------------------------+
| 3. STRICT EXECUTION BOUNDARIES                                    |
|    "Build part-by-part or in one complete verified pass with      |
|     exact endpoints, Pydantic schemas, and PKR currency..."       |
+-------------------------------------------------------------------+
| 4. ACCEPTANCE & VERIFICATION CRITERIA                             |
|    "Verify all 12 bag images, test cart empty guard, verify       |
|     Rs. 10,000 delivery threshold, and confirm receipt printing." |
+-------------------------------------------------------------------+
```

---

## 3. Operational Rules for Code Generation

### 3.1 Frontend & UI Standards
* **Tailwind CSS Utility Discipline**: Use semantic Tailwind classes instead of inline styles. Group utilities logically: layout (`flex`, `grid`) -> spacing (`p-4`, `mb-2`) -> sizing (`w-full`, `max-w-md`) -> colors/typography (`bg-slate-900`, `font-extrabold`) -> micro-interactions (`hover:scale-105`, `transition-all`).
* **Image Resilience**: Never render an `<img>` tag without both an accessible `alt` attribute and an inline `onerror` fallback handler:
  ```html
  <img src="${bag.image_url}" alt="${bag.name}" onerror="this.onerror=null;this.src='FALLBACK_URL';" loading="lazy" />
  ```
* **Currency Formatting**: Never hardcode raw numbers. Centralize currency formatting through a dedicated helper:
  ```javascript
  formatPKR(amount) {
    return `Rs. ${Math.round(amount).toLocaleString('en-PK')}`;
  }
  ```
* **Cache Management**: When catalog schemas or currency types change, immediately version `localStorage` keys and implement automated cache-clearing methods (`clearLegacyCaches()`).

---

### 3.2 Backend & Python Standards
* **Asynchronous & Decoupled**: Use FastAPI with `@asynccontextmanager` lifespan handlers for startup initialization and database seeding.
* **Type Safety with Pydantic v2**: Declare explicit Pydantic models for all incoming request bodies and outgoing responses. Avoid returning raw untyped dictionaries.
* **Thread-Safe SQLite**:
  * Always use a context manager (`@contextmanager def get_db():`) to guarantee connections are closed and rolled back on exceptions.
  * Enable Write-Ahead Logging (`PRAGMA journal_mode = WAL`) and foreign keys (`PRAGMA foreign_keys = ON`) on every connection.
* **Dual-Hosting Configuration**: Mount static directories (`/css`, `/js`) and serve the root `index.html` via `FileResponse` while keeping CORS open (`allow_origins=["*"]`) for Live Server compatibility.

---

## 4. Key Prompt Recipes Used in this Project

### Recipe A: The Commercial Storefront Pivot
> *"Completely rewrite and replace frontend/index.html, frontend/css/custom.css, and frontend/js/app.js to build a 100% complete, hard-selling E-Commerce Bag Store (like Zara, ASOS, or Amazon Luxury). Include top promo strip, sticky header with live search, split season sale hero with countdown timer, 4 trust badges, 12 distinct bags across 5 categories, slide-out cart drawer, and teacher demo modal."*

### Recipe B: Pakistan Localization & Currency Polish
> *"Do a complete polish and bug-fix pass: Rebrand to NISHU LUXE (BY NITASHA). Convert all currencies to Pakistani Rupees (PKR / Rs.) with realistic prices between Rs. 4,500 and Rs. 16,500. Fix wrong Unsplash images using verified bag photos. Update free delivery threshold to Rs. 10,000 and standard courier to Rs. 500. Add Pakistan checkout options (COD, JazzCash/EasyPaisa) and force reset localStorage caches."*

---

## 5. Agent Constraints Checklist

- [x] **No Ghost Dependencies**: All CDN links and libraries are loaded directly without requiring complex local Node.js compilation.
- [x] **Zero Dead Code**: Unused methods or conflicting event handlers are cleaned up during refactoring passes.
- [x] **Cross-Platform Portability**: File paths, terminal commands, and URL routes are compatible with Windows PowerShell and Linux/macOS.
- [x] **Verified Deliverables**: Commands are executed to test endpoints and confirm `HTTP 200 OK` before declaring tasks complete.

