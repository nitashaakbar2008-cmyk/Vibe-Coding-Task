# 📡 Backend API Specification — NISHU LUXE

**API Title:** NISHU LUXE STORE API  
**Framework:** FastAPI 0.110+ (Python 3.13+)  
**Base URL:** `http://127.0.0.1:8000`  
**Swagger UI:** `http://127.0.0.1:8000/docs`  
**ReDoc:** `http://127.0.0.1:8000/redoc`  
**Database:** SQLite3 (WAL Mode, `backend/nishuluxe_store.db`)  

---

## 1. Overview & Middleware

The backend is built with FastAPI to deliver asynchronous, type-safe API endpoints for bag catalog queries and checkout order fulfillment.

### 1.1 CORS Configuration
CORS is explicitly enabled to allow testing from any origin (including VS Code Live Server on port 5500):
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 1.2 Static File Mounting & Direct HTML Serving
FastAPI mounts the frontend static assets and directly serves `frontend/index.html` at root `GET /`:
* `GET /` -> Serves `frontend/index.html`
* `GET /css/*` -> Serves CSS assets from `frontend/css/`
* `GET /js/*` -> Serves JavaScript assets from `frontend/js/`

---

## 2. API Endpoints Summary

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service health check, store identity & currency | None |
| `GET` | `/api/bags` | Fetch all 12+ bags in inventory with live stock | None |
| `POST` | `/api/bags` | Teacher demo: Insert new bag into SQLite | None |
| `POST` | `/api/orders` | Validate cart items, decrement stock, save order | None |
| `GET` | `/api/orders/{order_ref}` | Fetch confirmed order receipt by reference ID | None |

---

## 3. Detailed Endpoint Specifications

### 3.1 Health Check
* **Endpoint:** `GET /api/health`
* **Description:** Verifies server responsiveness and returns current time and store identity.
* **Response `200 OK`**:
```json
{
  "status": "online",
  "store": "NISHU LUXE by Nitasha",
  "currency": "PKR (Rs.)",
  "timestamp": "2026-10-18T14:33:17.123531"
}
```

---

### 3.2 Get Bags Catalog
* **Endpoint:** `GET /api/bags`
* **Description:** Retrieves all bags from the SQLite `bags` table. Auto-seeds 12 default items on first launch.
* **Response `200 OK`**:
```json
[
  {
    "id": "bag-01",
    "name": "Classic Tuscan Leather Tote",
    "category": "Tote Bags",
    "price": 8900.0,
    "original_price": 13500.0,
    "badge": "-34% OFF",
    "rating": 4.9,
    "reviews_count": 184,
    "image_url": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    "stock_count": 28,
    "description": "Crafted from rich full-grain leather with sturdy reinforced handles and roomy interior compartment. Fits 15\" laptops.",
    "colors": ["Cognac Brown", "Obsidian Black", "Olive Green"]
  },
  {
    "id": "bag-02",
    "name": "Quilted Chain Evening Crossbody",
    "category": "Crossbody & Shoulder",
    "price": 6800.0,
    "original_price": 9900.0,
    "badge": "BESTSELLER",
    "rating": 4.9,
    "reviews_count": 248,
    "image_url": "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80",
    "stock_count": 35,
    "description": "Chic diamond-quilted finish with an elegant gold-tone curb chain strap. Perfect for evening events, dinners, and parties.",
    "colors": ["Caramel Nude", "Jet Black", "Ruby Red"]
  }
]
```

---

### 3.3 Add New Bag (Teacher Demo)
* **Endpoint:** `POST /api/bags`
* **Description:** Used during school presentations to demonstrate live CRUD functionality. Adds a new product to the SQLite database.
* **Request Headers:** `Content-Type: application/json`
* **Request Body (`BagCreateRequest`)**:
```json
{
  "name": "Royal Velvet Embroidered Clutch",
  "category": "Luxury Handbags",
  "price": 9500.0,
  "original_price": 14000.0,
  "badge": "NEW",
  "image_url": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
  "stock_count": 15,
  "description": "Handmade velvet clutch with brass embellishments for wedding events.",
  "colors": ["Emerald Green", "Ruby Red", "Obsidian Black"]
}
```
* **Response `200 OK` (`BagItem`)**:
```json
{
  "id": "bag-1792312180",
  "name": "Royal Velvet Embroidered Clutch",
  "category": "Luxury Handbags",
  "price": 9500.0,
  "original_price": 14000.0,
  "badge": "NEW",
  "rating": 5.0,
  "reviews_count": 1,
  "image_url": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
  "stock_count": 15,
  "description": "Handmade velvet clutch with brass embellishments for wedding events.",
  "colors": ["Emerald Green", "Ruby Red", "Obsidian Black"]
}
```

---

### 3.4 Place Customer Order
* **Endpoint:** `POST /api/orders`
* **Description:** Validates customer delivery details and cart items, decrements stock in SQLite, persists the order, and generates a printable confirmation receipt.
* **Request Headers:** `Content-Type: application/json`
* **Request Body (`OrderCreateRequest`)**:
```json
{
  "fullName": "Nitasha (Nishu)",
  "email": "nitasha@nishuluxe.pk",
  "phone": "+92 300 1234567",
  "address": "House 24, Street 7, Sector F-7/2",
  "city": "Islamabad",
  "paymentMethod": "Cash on Delivery (COD)",
  "promoCode": "NISHU20",
  "discountAmount": 1780.0,
  "subtotal": 8900.0,
  "total": 7620.0,
  "items": [
    {
      "id": "bag-01",
      "name": "Classic Tuscan Leather Tote",
      "price": 8900.0,
      "quantity": 1,
      "color": "Cognac Brown",
      "image_url": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
    }
  ]
}
```
* **Response `200 OK` (`OrderConfirmationResponse`)**:
```json
{
  "status": "ORDER_PLACED_SUCCESSFULLY",
  "orderRef": "NL-2026-2480",
  "fullName": "Nitasha (Nishu)",
  "email": "nitasha@nishuluxe.pk",
  "subtotal": 8900.0,
  "discountAmount": 1780.0,
  "total": 7620.0,
  "paymentMethod": "Cash on Delivery (COD)",
  "estimatedDelivery": "Wednesday, October 21, 2026 (3-4 Business Days Express across Pakistan)",
  "createdAt": "October 18, 2026 at 02:34 PM",
  "message": "Your order has been confirmed! An invoice and tracking link will be sent to your email. Thank you for shopping with Nishu Luxe by Nitasha."
}
```

---

### 3.5 Fetch Order Receipt
* **Endpoint:** `GET /api/orders/{order_ref}`
* **Description:** Retrieves stored order details and purchased item snapshots by order ID.
* **Parameters:** `order_ref` (path string, e.g. `NL-2026-2480`).
* **Response `200 OK`**:
```json
{
  "orderRef": "NL-2026-2480",
  "fullName": "Nitasha (Nishu)",
  "email": "nitasha@nishuluxe.pk",
  "phone": "+92 300 1234567",
  "address": "House 24, Street 7, Sector F-7/2",
  "city": "Islamabad",
  "paymentMethod": "Cash on Delivery (COD)",
  "subtotal": 8900.0,
  "discountAmount": 1780.0,
  "total": 7620.0,
  "items": [
    {
      "id": "bag-01",
      "name": "Classic Tuscan Leather Tote",
      "price": 8900.0,
      "quantity": 1,
      "color": "Cognac Brown"
    }
  ],
  "status": "CONFIRMED_PROCESSING",
  "createdAt": "2026-10-18T14:34:30.123531"
}
```
* **Response `404 Not Found`**:
```json
{
  "detail": "Order reference not found."
}
```

---

## 4. Pydantic Models & Schemas

Defined in [`backend/models.py`](file:///c:/Users/DELL/OneDrive/Pictures/Desktop/School%20Project/backend/models.py):

```python
class BagItem(BaseModel):
    id: str
    name: str
    category: str
    price: float
    original_price: float
    badge: str
    rating: float
    reviews_count: int
    image_url: str
    stock_count: int
    description: str
    colors: List[str]

class BagCreateRequest(BaseModel):
    name: str = Field(..., min_length=2)
    category: str
    price: float = Field(..., gt=0)
    original_price: Optional[float] = None
    badge: Optional[str] = "NEW"
    image_url: str
    stock_count: Optional[int] = 20
    description: Optional[str] = "Premium designer bag."
    colors: Optional[List[str]] = ["Black", "Brown"]

class OrderCartItem(BaseModel):
    id: str
    name: str
    price: float
    image_url: Optional[str] = None
    color: Optional[str] = "Standard"
    quantity: int = Field(default=1, ge=1)

class OrderCreateRequest(BaseModel):
    fullName: str
    email: str
    phone: str
    address: str
    city: str
    paymentMethod: Optional[str] = "Cash on Delivery (COD)"
    promoCode: Optional[str] = ""
    discountAmount: Optional[float] = 0.0
    subtotal: float
    total: float
    items: List[OrderCartItem]

class OrderConfirmationResponse(BaseModel):
    status: str
    orderRef: str
    fullName: str
    email: str
    subtotal: float
    discountAmount: float
    total: float
    paymentMethod: str
    estimatedDelivery: str
    createdAt: str
    message: str
```

