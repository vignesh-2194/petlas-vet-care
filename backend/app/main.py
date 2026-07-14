import sys
from pathlib import Path

# This automatically tells Python to look inside your deep folder for imports!
current_dir = Path(__file__).resolve().parent
sys.path.append(str(current_dir))


import os
from dotenv import load_dotenv

# This command opens your secure .env file and extracts the hidden values
load_dotenv()

import os
import certifi
from datetime import datetime
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from app.models.domain_models import ProductDocument, AppointmentDocument

app = FastAPI(title="Petla's Vet Care Unified Live Cloud Engine", version="21.0.0")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGO_URI = os.getenv("MONGO_URI")

client = AsyncIOMotorClient(
    MONGO_URI,
    tlsCAFile=certifi.where(),
    serverSelectionTimeoutMS=5000
)

db = client[os.getenv("ATLAS_DATABASE_NAME")]

print("=" * 60)
print("Mongo URI:", MONGO_URI)
print("Database Name:", db.name)
print("=" * 60)


# =====================================================================
#                       WALL MEMORIES / GALLERY ROUTES
# =====================================================================

@app.get("/api/memories")
@app.get("/memories")
async def list_memories():
    try:
        # Securely streams your original records from the live 'memories' collection shown on your screen
        cursor = db["memories"].find().sort("createdAt", -1)
        records = await cursor.to_list(length=100)
        print(f"🎉 Live Memories Loaded From Cloud: {len(records)}")
        for r in records:
            if "_id" in r:
                r["_id"] = str(r["_id"])
        return records
    except Exception as err:
        print("GALLERY FETCHING CRASH LOG:", str(err))
        return []

@app.post("/api/memories", status_code=status.HTTP_201_CREATED)
async def create_memory(payload: dict):
    try:
        payload["createdAt"] = datetime.now().isoformat()
        if "comments" not in payload:
            payload["comments"] = []
        result = await db["memories"].insert_one(payload)
        payload["_id"] = str(result.inserted_id)
        return payload
    except Exception as err:
        raise HTTPException(status_code=500, detail=str(err))
    
from bson import ObjectId
from fastapi import HTTPException

@app.delete("/api/memories/{memory_id}")
async def remove_clinic_memory(memory_id: str):
    try:
        # Step A: Double-check if the ID sent by the frontend is a valid MongoDB ID format
        if not ObjectId.is_valid(memory_id):
            raise HTTPException(status_code=400, detail="Invalid ID format standard.")

        # Step B: CRITICAL FIX! We wrap memory_id inside ObjectId() so MongoDB recognizes it
        result = await db["memories"].delete_one({"_id": ObjectId(memory_id)})
        
        # Step C: If MongoDB searched but found 0 matches, show a 404 Not Found error
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Memory slot not found.")
            
        # Step D: If everything went perfectly, return success to your frontend
        return {"success": True, "message": "Memory node removed from workspace board."}
        
    except HTTPException as http_err:
        raise http_err
    except Exception as err:
        raise HTTPException(status_code=500, detail=str(err))

# =====================================================================
#                        APPOINTMENTS ENDPOINTS
# =====================================================================

@app.get("/api/appointments")
@app.get("/appointments")
async def stream_appointments():
    try:
        cursor = db["appointments"].find().sort("createdAt", -1)
        records = await cursor.to_list(length=100)
        for r in records:
            if "_id" in r:
                r["_id"] = str(r["_id"])
        return records
    except Exception as err:
        return []

@app.post("/api/appointments", status_code=status.HTTP_201_CREATED)
async def create_appointment(payload: dict):
    try:
        new_appointment = {
            "customerName": payload.get("customerName", ""),
            "phone": payload.get("phone", ""),
            "email": payload.get("email", ""),
            "petName": payload.get("petName", ""),
            "petType": payload.get("petType", ""),
            "breed": payload.get("breed", "Unknown"),
            "age": int(payload.get("age", 1)),
            "problemDescription": payload.get("problemDescription", ""),
            "preferredDate": payload.get("preferredDate", ""),
            "preferredTime": payload.get("preferredTime", ""),
            "status": "Pending",
            "createdAt": datetime.now().isoformat()
        }
        result = await db["appointments"].insert_one(new_appointment)
        new_appointment["_id"] = str(result.inserted_id)
        return {"success": True, "data": new_appointment}
    except Exception as err:
        raise HTTPException(status_code=500, detail=str(err))

@app.patch("/api/appointments/{appointment_id}")
async def modify_appointment_status(appointment_id: str, status_payload: dict):
    try:
        target_id = ObjectId(appointment_id) if ObjectId.is_valid(appointment_id) else appointment_id
        await db["appointments"].update_one(
            {"_id": target_id},
            {"$set": {"status": status_payload.get("status", "Pending")}}
        )
        return {"success": True}
    except Exception as err:
        raise HTTPException(status_code=500, detail=str(err))

# =====================================================================
#                         PRODUCT CHANNELS
# =====================================================================

# =====================================================================
#                        PRODUCT UPDATE ROUTE (PUT)
# =====================================================================
@app.put("/api/products/{product_id}")
async def update_catalog_product(product_id: str, doc: dict):
    try:
        # Convert string product_id into a safe MongoDB ObjectId
        target_id = ObjectId(product_id) if ObjectId.is_valid(product_id) else product_id
        
        # Perform the document save override inside MongoDB storage engine
        result = await db["products"].update_one(
            {"_id": target_id},
            {"$set": doc}
        )
        
        return {"success": True, "message": "Product settings updated inside storage engine."}
        
    except Exception as err:
        print("PRODUCT UPDATE FAILURE DETAILED REPORT:", str(err))
        raise HTTPException(
            status_code=500, 
            detail=f"Failed to update product settings inside storage engine: {str(err)}"
        )

        
    except Exception as err:
        print("PRODUCT UPDATE FAILURE DETAILED REPORT:", str(err))
        raise HTTPException(
            status_code=500, 
            detail=f"Failed to update product settings inside storage engine: {str(err)}"
        )



@app.get("/api/products")
@app.get("/products")
async def stream_products_catalog():
    try:
        count = await db["products"].count_documents({})
        print("Products in MongoDB:", count)

        cursor = db["products"].find()
        records = await cursor.to_list(length=100)

        #print("Fetched records:", records)

        for r in records:
            if "_id" in r:
                r["_id"] = str(r["_id"])
            if "imageUrl" not in r and "image_url" in r:
                r["imageUrl"] = r["image_url"]

        return records

    except Exception as err:
        print("ERROR:", err)
        return []

@app.post("/api/products", status_code=status.HTTP_201_CREATED)
async def store_product(doc: ProductDocument):
    try:
        payload = doc.model_dump(by_alias=True)
        result = await db["products"].insert_one(payload)
        payload["_id"] = str(result.inserted_id)
        return {"success": True, "product": payload}
    except Exception as err:
        raise HTTPException(status_code=500, detail=str(err))

@app.delete("/api/products/{product_id}")
async def remove_catalog_product(product_id: str):
    try:
        target_id = ObjectId(product_id) if ObjectId.is_valid(product_id) else product_id
        await db["products"].delete_one({"_id": target_id})
        return {"success": True}
    except Exception as err:
        raise HTTPException(status_code=500, detail=str(err))

@app.get("/")
async def root_ping():
    return {"status": "Online", "database": "All Collections Fully Synced Stream Channels Active."}

@app.post("/api/admin/login")
async def admin_login(payload: dict):
    username = payload.get("username")
    password = payload.get("password")

    # This checks your input text straight against your desired dashboard credentials
    if username == "petlas_vet_care" and password == "vignesh2194":
        return {"success": True, "message": "Access Matrix Initialized Successfully."}

    raise HTTPException(status_code=401, detail="Invalid administrative username identifier or security passcode mapping.")
