from fastapi import APIRouter, HTTPException
from db import load_db

router = APIRouter(prefix="/opcodes", tags=["opcodes"])

@router.get("/all")
def get_all_opcodes():
    db = load_db()
    return db.get("opcodes", [])

@router.get("/like/{this_code}")
def get_opcodes_like(this_code: str):
    db = load_db()
    matches = [c for c in db["opcodes"] if c["code"].startswith(str(this_code))]
    if not matches:
        raise HTTPException(status_code=404, detail="Keine passenden OP-Codes gefunden")
    return matches