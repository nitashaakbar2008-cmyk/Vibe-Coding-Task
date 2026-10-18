"""
NISHU LUXE (BY NITASHA) — Pydantic Schemas for Storefront & Orders
"""

from typing import List, Optional
from pydantic import BaseModel, Field

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
