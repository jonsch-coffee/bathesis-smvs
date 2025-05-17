from fastapi import FastAPI, Request, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from typing import Optional
import uuid
import json
import os


# API-KEY
load_dotenv()
API_KEY = os.getenv("API_KEY")

# Datastore
BASE_DIR = os.path.dirname(__file__)
db_path = os.path.join(BASE_DIR, "db.json")

# CORS. Important: allow_origins must contain https://smvs-gmbh.ch when deployed in production!
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:8081"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Read datastore
with open(db_path, "r", encoding="utf-8") as file:
    db = json.load(file)

# Verifies the API_KEY for PATCH, GET and POST operations
def verify_api_key(auth: Optional[str]):
    if auth != f"Bearer {API_KEY}":
        raise HTTPException(status_code=403, detail="Ungültiger API-Key")


#######################################################
# CRUD operations. API-KEY needed! Editor only.
#######################################################

# PATCH receives periodic changes from useAutoSaveGuide.js
@app.patch("/guides/{guide_id}")
async def patch_guide(guide_id: str, request: Request, authorization: Optional[str] = Header(None)):
    verify_api_key(authorization)

    payload = await request.json()

    # Find guide
    for i, guide in enumerate(db["guides"]):
        if str(guide["id"]) == guide_id:
            # Replace guide
            db["guides"][i] = payload

            # Remove guide from global list
            db["opcodes"] = [o for o in db.get("opcodes", []) if str(o["guideId"]) != guide_id]

            # If available: Add newly added operation-codes to the last section of the datastore. eg.:
            # "opcodes": [
            #    {
            #        "code": "88728872",
            #        "guideId": "2b364e55-2ce7-4e1e-a40d-02d2c1331e32"
            #    },
            op_codes = payload.get("opCodes", [])
            new_entries = [{"code": code, "guideId": guide_id} for code in op_codes]
            db["opcodes"].extend(new_entries)

            # Save changes
            with open(db_path, "w", encoding="utf-8") as file:
                json.dump(db, file, ensure_ascii=False, indent=2)

            return {"status": "updated", "guideId": guide_id}

    raise HTTPException(status_code=404, detail="Guide nicht gefunden")


# POST creates a new guide that minimally contains the title
@app.post("/guides/create")
async def create_guide(request: Request, authorization: Optional[str] = Header(None)):
    verify_api_key(authorization)
    body = await request.json()
    title = body.get("title")

    if not title:
        raise HTTPException(status_code=400, detail="Titel fehlt.")

    new_guide = {
        "id": str(uuid.uuid4()),  # ID wird serverseitig generiert
        "title": title,
        "steps": [],
        "opCodes": []
    }

    db.setdefault("guides", []).append(new_guide)

    with open(db_path, "w", encoding="utf-8") as file:
        json.dump(db, file, ensure_ascii=False, indent=2)

    return new_guide

# DELETEs a guide
@app.delete("/guides/{guide_id}")
async def delete_guide(guide_id: str, authorization: Optional[str] = Header(None)):
    verify_api_key(authorization)

    # Search for the requested guide
    index = next((i for i, g in enumerate(db["guides"]) if str(g["id"]) == guide_id), None)
    if index is None:
        raise HTTPException(status_code=404, detail="Guide nicht gefunden")

    deleted = db["guides"].pop(index)

    # Removes associated operation-codes
    db["opcodes"] = [o for o in db.get("opcodes", []) if str(o["guideId"]) != guide_id]

    with open(db_path, "w", encoding="utf-8") as file:
        json.dump(db, file, ensure_ascii=False, indent=2)

    return {
        "status": "deleted",
        "deletedGuideId": guide_id,
        "title": deleted["title"]
    }

#######################################################
# Get requests. No API-KEY needed.
#######################################################

# Returns all guides
@app.get("/guides/all")
def get_all_guides():
    return db.get("guides", [])

# Returns a specific guide based on its ID
@app.get("/guides/{requested_guide_id}")
def get_guide_by_id(requested_guide_id: str):
    guide = next((g for g in db["guides"] if g["id"] == requested_guide_id), None)
    if guide is None:
        raise HTTPException(status_code=404, detail="Kein passender Guide gefunden")
    return guide

# Returns a list of all Operation-Codes and their referenced guide
@app.get("/opcodes/all")
def get_all_opcodes():
    return db.get("opcodes", [])

# Used for TypeAhead. Checks available codes from left to right.
@app.get("/opcodes/like/{this_code}")
def get_opcodes_like(this_code: str):
    matches = [c for c in db["opcodes"] if c["code"].startswith(str(this_code))]
    if not matches:
        raise HTTPException(status_code=404, detail="Keine passenden OP-Codes gefunden")
    return matches