from fastapi import FastAPI, Request, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import json
import os

BASE_DIR = os.path.dirname(__file__)
db_path = os.path.join(BASE_DIR, "db.json")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB
with open(db_path, "r", encoding="utf-8") as file:
    db = json.load(file)

# Optional: API-Key Prüfung (kann auch optional weggelassen werden)
API_KEY = "mpamsido"

def verify_api_key(auth: Optional[str]):
    if auth != f"Bearer {API_KEY}":
        raise HTTPException(status_code=403, detail="Ungültiger API-Key")

# Returns system-health
@app.get("/health")
def health():
    return {"status": "ok"}

# PATCH /guides/{guide_id}
@app.patch("/guides/{guide_id}")
async def patch_guide(guide_id: int, request: Request, authorization: Optional[str] = Header(None)):
    verify_api_key(authorization)

    payload = await request.json()

    # Guide finden
    for i, guide in enumerate(db["guides"]):
        if guide["id"] == guide_id:
            db["guides"][i] = payload  # Ganzes Objekt ersetzen
            with open(db_path, "w", encoding="utf-8") as file:
                json.dump(db, file, ensure_ascii=False, indent=2)
            return {"status": "updated"}

    raise HTTPException(status_code=404, detail="Guide nicht gefunden")

# Returns all registered guides
@app.get("/guides/all")
def get_all_guides():
    return db.get("guides", [])

# Returns a specific guide based on its ID
@app.get("/guides/{requested_guide_id}")
def get_guide_by_id(requested_guide_id: int):
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
def get_opcodes_like(this_code: int):
    matches = [c for c in db["opcodes"] if c["code"].startswith(str(this_code))]
    if not matches:
        raise HTTPException(status_code=404, detail="Keine passenden OP-Codes gefunden")
    return matches