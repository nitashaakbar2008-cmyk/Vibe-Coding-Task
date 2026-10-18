"""
LUXEBAGS STORE — Database Engine (SQLite)
Fast, thread-safe e-commerce database with auto-seeding for 12 store products and dynamic order management.
"""

import sqlite3
import json
import os
from datetime import datetime
from contextlib import contextmanager

DB_PATH = os.path.join(os.path.dirname(__file__), "nishuluxe_store.db")

@contextmanager
def get_db():
    """Thread-safe SQLite connection context manager with WAL mode."""
    conn = sqlite3.connect(DB_PATH, timeout=10.0)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode = WAL")
    conn.execute("PRAGMA foreign_keys = ON")
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()

def init_db():
    """Initializes tables and seeds 12 storefront bags if empty."""
    with get_db() as conn:
        cursor = conn.cursor()
        
        # 1. Bags Catalog Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS bags (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                category TEXT NOT NULL,
                price REAL NOT NULL,
                original_price REAL NOT NULL,
                badge TEXT NOT NULL,
                rating REAL NOT NULL,
                reviews_count INTEGER NOT NULL,
                image_url TEXT NOT NULL,
                stock_count INTEGER NOT NULL,
                description TEXT NOT NULL,
                colors_json TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
        """)

        # 2. Orders Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                order_ref TEXT UNIQUE NOT NULL,
                full_name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT NOT NULL,
                address TEXT NOT NULL,
                city TEXT NOT NULL,
                payment_method TEXT NOT NULL,
                promo_code TEXT,
                discount_amount REAL NOT NULL,
                subtotal REAL NOT NULL,
                total REAL NOT NULL,
                items_json TEXT NOT NULL,
                status TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
        """)

        # Check if bags are seeded
        cursor.execute("SELECT COUNT(*) as count FROM bags")
        row = cursor.fetchone()
        if row["count"] == 0:
            seed_store_bags(conn)

def seed_store_bags(conn):
    """Seeds the 12 complete e-commerce bag items into SQLite with PKR pricing."""
    seed_data = [
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
        },
        {
            "id": "bag-03",
            "name": "Structured Executive Satchel",
            "category": "Luxury Handbags",
            "price": 14500.0,
            "original_price": 21000.0,
            "badge": "BESTSELLER",
            "rating": 5.0,
            "reviews_count": 312,
            "image_url": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
            "stock_count": 14,
            "description": "Modern architectural silhouette with turn-lock brass hardware, divider compartments, and detachable shoulder sling.",
            "colors": ["Espresso Noir", "Bone White", "Burgundy"]
        },
        {
            "id": "bag-04",
            "name": "Vintage Canvas & Leather Weekender",
            "category": "Travel Duffels",
            "price": 11900.0,
            "original_price": 17500.0,
            "badge": "-32% OFF",
            "rating": 4.9,
            "reviews_count": 205,
            "image_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
            "stock_count": 19,
            "description": "Heavy-duty waxed canvas with bridle leather trim, dedicated shoe compartment, and cabin-approved dimensions.",
            "colors": ["Military Khaki", "Dark Coffee", "Charcoal Grey"]
        },
        {
            "id": "bag-05",
            "name": "Minimalist Leather City Backpack",
            "category": "Backpacks",
            "price": 9500.0,
            "original_price": 14000.0,
            "badge": "-32% OFF",
            "rating": 4.8,
            "reviews_count": 156,
            "image_url": "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=800&q=80",
            "stock_count": 22,
            "description": "Sleek unisex urban backpack with padded 14\" laptop sleeve, water-resistant base, and anti-theft hidden pocket.",
            "colors": ["Matte Black", "Chestnut Tan", "Navy Blue"]
        },
        {
            "id": "bag-06",
            "name": "Flap Lock Designer Handbag",
            "category": "Luxury Handbags",
            "price": 12800.0,
            "original_price": 18500.0,
            "badge": "-30% OFF",
            "rating": 4.9,
            "reviews_count": 144,
            "image_url": "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
            "stock_count": 16,
            "description": "Smooth calfskin leather with polished metallic emblem and magnetic front flap. Comes with signature Nishu Luxe dust bag.",
            "colors": ["Sienna Caramel", "Midnight Black", "Sage Green"]
        },
        {
            "id": "bag-07",
            "name": "Slouchy Minimalist Hobo Tote",
            "category": "Tote Bags",
            "price": 7500.0,
            "original_price": 11000.0,
            "badge": "-32% OFF",
            "rating": 4.7,
            "reviews_count": 67,
            "image_url": "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80",
            "stock_count": 30,
            "description": "Soft pebble leather with a natural slouchy drape. Generous capacity for notebooks, tablets, and daily essentials.",
            "colors": ["Mocha Brown", "Oatmeal Beige", "Black"]
        },
        {
            "id": "bag-08",
            "name": "Compact Camera Crossbody",
            "category": "Crossbody & Shoulder",
            "price": 4500.0,
            "original_price": 7000.0,
            "badge": "SALE",
            "rating": 4.6,
            "reviews_count": 115,
            "image_url": "https://images.unsplash.com/photo-1563903530908-afdd155d057a?auto=format&fit=crop&w=800&q=80",
            "stock_count": 42,
            "description": "Lightweight curved crossbody with dual zipper compartments. Keeps your phone, cards, and daily essentials organized.",
            "colors": ["Terracotta", "Forest Green", "Classic Black"]
        },
        {
            "id": "bag-09",
            "name": "Commuter Laptop Backpack 15.6\"",
            "category": "Backpacks",
            "price": 8500.0,
            "original_price": 12500.0,
            "badge": "NEW",
            "rating": 4.7,
            "reviews_count": 88,
            "image_url": "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80",
            "stock_count": 25,
            "description": "Engineered for university students and working professionals. Water-repellent nylon, USB pass-through, and ergonomic padding.",
            "colors": ["Storm Grey", "Stealth Black", "Oxford Blue"]
        },
        {
            "id": "bag-10",
            "name": "Croco-Embossed Work Tote",
            "category": "Tote Bags",
            "price": 13900.0,
            "original_price": 19500.0,
            "badge": "BESTSELLER",
            "rating": 4.8,
            "reviews_count": 92,
            "image_url": "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=80",
            "stock_count": 18,
            "description": "High-shine crocodile embossed leather that commands attention in any meeting. Includes detachable zipper pouch.",
            "colors": ["Glossy Black", "Deep Plum", "Emerald Green"]
        },
        {
            "id": "bag-11",
            "name": "Voyager Leather 48H Overnight Duffel",
            "category": "Travel Duffels",
            "price": 16500.0,
            "original_price": 24000.0,
            "badge": "BESTSELLER",
            "rating": 5.0,
            "reviews_count": 173,
            "image_url": "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80",
            "stock_count": 12,
            "description": "Premium full-grain pull-up leather duffel bag. Handcrafted double zipper, reinforced base studs, and padded strap.",
            "colors": ["Rustic Amber", "Espresso Dark", "Midnight Black"]
        },
        {
            "id": "bag-12",
            "name": "Half-Moon Crescent Saddle Bag",
            "category": "Crossbody & Shoulder",
            "price": 6500.0,
            "original_price": 9500.0,
            "badge": "NEW",
            "rating": 4.8,
            "reviews_count": 79,
            "image_url": "https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=800&q=80",
            "stock_count": 27,
            "description": "Trending curved crescent shape with wide adjustable shoulder strap. Sits comfortably against the waist or cross-body.",
            "colors": ["Merlot Burgundy", "Olive Khaki", "Jet Black"]
        }
    ]

    cursor = conn.cursor()
    for bag in seed_data:
        cursor.execute("""
            INSERT INTO bags (
                id, name, category, price, original_price, badge, rating,
                reviews_count, image_url, stock_count, description, colors_json, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            bag["id"],
            bag["name"],
            bag["category"],
            bag["price"],
            bag["original_price"],
            bag["badge"],
            bag["rating"],
            bag["reviews_count"],
            bag["image_url"],
            bag["stock_count"],
            bag["description"],
            json.dumps(bag["colors"]),
            datetime.now().isoformat()
        ))

def get_all_bags():
    """Returns all bags ordered by newest / id."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM bags ORDER BY id ASC")
        rows = cursor.fetchall()
        result = []
        for r in rows:
            result.append({
                "id": r["id"],
                "name": r["name"],
                "category": r["category"],
                "price": r["price"],
                "original_price": r["original_price"],
                "badge": r["badge"],
                "rating": r["rating"],
                "reviews_count": r["reviews_count"],
                "image_url": r["image_url"],
                "stock_count": r["stock_count"],
                "description": r["description"],
                "colors": json.loads(r["colors_json"])
            })
        return result

def insert_bag(bag_data):
    """Inserts an admin-created bag into SQLite."""
    with get_db() as conn:
        cursor = conn.cursor()
        bag_id = bag_data.get("id") or f"bag-{int(datetime.now().timestamp())}"
        cursor.execute("""
            INSERT INTO bags (
                id, name, category, price, original_price, badge, rating,
                reviews_count, image_url, stock_count, description, colors_json, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            bag_id,
            bag_data["name"],
            bag_data["category"],
            float(bag_data["price"]),
            float(bag_data.get("original_price", float(bag_data["price"]) * 1.3)),
            bag_data.get("badge", "NEW"),
            float(bag_data.get("rating", 5.0)),
            int(bag_data.get("reviews_count", 1)),
            bag_data["image_url"],
            int(bag_data.get("stock_count", 20)),
            bag_data.get("description", "Premium quality handcrafted designer bag."),
            json.dumps(bag_data.get("colors", ["Classic Black", "Tan Brown"])),
            datetime.now().isoformat()
        ))
        bag_data["id"] = bag_id
        return bag_data

def create_order(order_data):
    """Creates an order and decrements inventory in SQLite."""
    with get_db() as conn:
        cursor = conn.cursor()
        
        # Decrement stock for each item if found
        for itm in order_data["items"]:
            b_id = itm.get("id") or itm.get("bagId")
            qty = int(itm.get("quantity", 1))
            if b_id:
                cursor.execute("UPDATE bags SET stock_count = MAX(0, stock_count - ?) WHERE id = ?", (qty, b_id))

        cursor.execute("""
            INSERT INTO orders (
                order_ref, full_name, email, phone, address, city,
                payment_method, promo_code, discount_amount, subtotal,
                total, items_json, status, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            order_data["orderRef"],
            order_data["fullName"],
            order_data["email"],
            order_data["phone"],
            order_data["address"],
            order_data["city"],
            order_data.get("paymentMethod", "Credit Card"),
            order_data.get("promoCode", ""),
            float(order_data.get("discountAmount", 0.0)),
            float(order_data["subtotal"]),
            float(order_data["total"]),
            json.dumps(order_data["items"]),
            "CONFIRMED_PROCESSING",
            datetime.now().isoformat()
        ))
        
        return order_data
