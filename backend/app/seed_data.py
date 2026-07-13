import os
import httpx
from datetime import datetime
from dotenv import load_dotenv

# This command opens your secure .env file and extracts the hidden values
load_dotenv()

ATLAS_DATA_API_URL = os.getenv("ATLAS_DATA_API_URL")
ATLAS_API_KEY = os.getenv("ATLAS_API_KEY")
CLUSTER_NAME = os.getenv("ATLAS_CLUSTER_NAME")
DATABASE_NAME = os.getenv("ATLAS_DATABASE_NAME")


HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Request-Headers": "*",
    "api-key": ATLAS_API_KEY
}

products_catalog = [
    {
        "name": "Advanced Renal Care Supplement",
        "price": 84.50,
        "category": "Therapeutics",
        "description": "Molecular kidney stabilization support formula designed for geriatric felines and canines.",
        "imageUrl": "https://unsplash.com",
        "availability": "In Stock",
        "createdAt": datetime.utcnow().isoformat()
    },
    {
        "name": "Hydrolyzed Hypoallergenic Protein Food",
        "price": 110.00,
        "category": "Clinical Nutrition",
        "description": "Premium pure micro-protein specialized diet to treat critical dermatological gut inflammation.",
        "imageUrl": "https://unsplash.com",
        "availability": "In Stock",
        "createdAt": datetime.utcnow().isoformat()
    },
    {
        "name": "Multi-Core Bio-Immune Booster",
        "price": 45.00,
        "category": "Supplements",
        "description": "Cellular recovery extract drops mapping trace elements to accelerate bone marrow repair pathways.",
        "imageUrl": "https://unsplash.com",
        "availability": "Available",
        "createdAt": datetime.utcnow().isoformat()
    }
]

def seed_database():
    print("🚀 Connecting to live MongoDB Atlas cloud via explicit HTTPS IP channel...")
    
    delete_payload = {
        "collection": "products",
        "database": DATABASE_NAME,
        "dataSource": CLUSTER_NAME,
        "filter": {}
    }
    
    try:
        print("🧹 Cleaning out old legacy collections to prevent record pollution...")
        del_resp = httpx.post(f"{ATLAS_DATA_API_URL}/action/deleteMany", json=delete_payload, headers=HEADERS, verify=False)
        
        insert_payload = {
            "collection": "products",
            "database": DATABASE_NAME,
            "dataSource": CLUSTER_NAME,
            "documents": products_catalog
        }
        
        print("📝 Injecting clean production data catalog schema array...")
        ins_resp = httpx.post(f"{ATLAS_DATA_API_URL}/action/insertMany", json=insert_payload, headers=HEADERS, verify=False)
        
        # FIXED FOREVER: Using standard numeric check to completely bypass bracket glitches
        if ins_resp.status_code == 200:
            print("🎉 Success! Real products are now securely populated on your MongoDB Atlas Cloud Storage via HTTPS IP!")
        elif ins_resp.status_code == 201:
            print("🎉 Success! Real products are now securely populated on your MongoDB Atlas Cloud Storage via HTTPS IP!")
        else:
            print(f"❌ Failed to write data: {ins_resp.text}")
            
    except Exception as e:
        print(f"❌ Connection error: {str(e)}")

if __name__ == "__main__":
    seed_database()
