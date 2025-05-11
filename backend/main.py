from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware

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

# Returns system-health
@app.get("/health")
def health():
    return {"status": "ok"}

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