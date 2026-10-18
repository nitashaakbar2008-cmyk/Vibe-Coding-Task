"""
LUXEBAGS STORE — FastAPI Server with StaticFiles Hosting & E-Commerce APIs
Serves frontend directly on http://127.0.0.1:8000/ and handles store catalog and order processing.
"""

import os
import random
from datetime import datetime, timedelta
from contextlib import asynccontextmanager
from typing import List

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from database import init_db, get_all_bags, insert_bag, create_order, get_db
from models import BagItem, BagCreateRequest, OrderCreateRequest, OrderConfirmationResponse

# Determine frontend directory path
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.abspath(os.path.join(CURRENT_DIR, "..", "frontend"))

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize and seed database on startup
    init_db()
    yield

app = FastAPI(
    title="NISHU LUXE STORE API",
    description="Nishu Luxe by Nitasha — E-Commerce Bag Storefront in Pakistan.",
    version="2.1.0",
    lifespan=lifespan
)

# Enable CORS for external Live Server or local dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# 1. API ROUTES
# ==========================================

@app.get("/api/health")
def health_check():
    """System health check endpoint."""
    return {
        "status": "online",
        "store": "NISHU LUXE by Nitasha",
        "currency": "PKR (Rs.)",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/bags", response_model=List[BagItem])
def get_bags():
    """Returns the full 12+ bag inventory from SQLite."""
    try:
        bags = get_all_bags()
        return bags
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Storefront database error: {str(e)}"
        )

@app.post("/api/bags", response_model=BagItem)
def add_new_bag(bag_req: BagCreateRequest):
    """Teacher Demo: Allows adding a brand new product to the storefront database."""
    try:
        new_bag = insert_bag(bag_req.model_dump())
        return new_bag
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to add bag: {str(e)}"
        )

@app.post("/api/orders", response_model=OrderConfirmationResponse)
def place_order(order_req: OrderCreateRequest):
    """
    Validates cart items, saves order into SQLite, decrements stock,
    and returns a printable customer order receipt.
    """
    if not order_req.items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Order cart cannot be empty."
        )

    # Generate receipt reference: NL-2026-XXXX
    year = datetime.now().year
    code = random.randint(1000, 9999)
    order_ref = f"NL-{year}-{code}"

    order_data = order_req.model_dump()
    order_data["orderRef"] = order_ref

    try:
        create_order(order_data)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Order processing error: {str(e)}"
        )

    est_date = (datetime.now() + timedelta(days=3)).strftime("%A, %B %d, %Y")

    return OrderConfirmationResponse(
        status="ORDER_PLACED_SUCCESSFULLY",
        orderRef=order_ref,
        fullName=order_req.fullName,
        email=order_req.email,
        subtotal=order_req.subtotal,
        discountAmount=order_req.discountAmount or 0.0,
        total=order_req.total,
        paymentMethod=order_req.paymentMethod or "Cash on Delivery",
        estimatedDelivery=f"{est_date} (3-4 Business Days Express across Pakistan)",
        createdAt=datetime.now().strftime("%B %d, %Y at %I:%M %p"),
        message="Your order has been confirmed! An invoice and tracking link will be sent to your email. Thank you for shopping with Nishu Luxe by Nitasha."
    )

@app.get("/api/orders/{order_ref}")
def get_order(order_ref: str):
    """Fetches order receipt by Order ID."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM orders WHERE order_ref = ?", (order_ref,))
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Order reference not found.")
        
        import json
        return {
            "orderRef": row["order_ref"],
            "fullName": row["full_name"],
            "email": row["email"],
            "phone": row["phone"],
            "address": row["address"],
            "city": row["city"],
            "paymentMethod": row["payment_method"],
            "subtotal": row["subtotal"],
            "discountAmount": row["discount_amount"],
            "total": row["total"],
            "items": json.loads(row["items_json"]),
            "status": row["status"],
            "createdAt": row["created_at"]
        }

# ==========================================
# 2. STATIC FILES & FRONTEND HOSTING
# ==========================================
if os.path.exists(FRONTEND_DIR):
    css_dir = os.path.join(FRONTEND_DIR, "css")
    js_dir = os.path.join(FRONTEND_DIR, "js")
    
    if os.path.exists(css_dir):
        app.mount("/css", StaticFiles(directory=css_dir), name="css")
    if os.path.exists(js_dir):
        app.mount("/js", StaticFiles(directory=js_dir), name="js")

    @app.get("/")
    def serve_index():
        """Serves frontend/index.html when accessing http://127.0.0.1:8000/ directly."""
        index_file = os.path.join(FRONTEND_DIR, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)
        return {"error": "frontend/index.html not found"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
