# app/routes/guides.py
from fastapi import APIRouter, Request, Header, HTTPException
from typing import Optional
import uuid

from db import load_db, save_db
from utils.auth import verify_api_key

#######################################################
# Get requests. No API-KEY needed.
#######################################################
router = APIRouter(prefix="/guides", tags=["guides"])

@router.get("/all")
def get_all_guides():
    db = load_db()
    return db.get("guides", [])

@router.get("/{requested_guide_id}")
def get_guide_by_id(requested_guide_id: str):
    db = load_db()
    guide = next((g for g in db["guides"] if g["id"] == requested_guide_id), None)
    if guide is None:
        raise HTTPException(status_code=404, detail="Kein passender Guide gefunden")
    return guide

#######################################################
# CRUD operations. API-KEY needed! Editor only.
#######################################################
# POST creates a new guide that minimally contains the title
@router.post("/create")
async def create_guide(request: Request, authorization: Optional[str] = Header(None)):
    verify_api_key(authorization)
    body = await request.json()
    title = body.get("title")

    if not title:
        raise HTTPException(status_code=400, detail="Titel fehlt.")

    db = load_db()
    new_guide = {
        "id": str(uuid.uuid4()), # uuid is generated here on the backend-side and returned to the app
        "title": title,
        "steps": [],
        "opCodes": []
    }

    db.setdefault("guides", []).append(new_guide)
    save_db(db)
    return new_guide

# PATCH receives periodic changes from useAutoSaveGuide.js
@router.patch("/{guide_id}")
async def patch_guide(guide_id: str, request: Request, authorization: Optional[str] = Header(None)):
    verify_api_key(authorization)
    db = load_db()
    payload = await request.json() # Replace guide

    # Find guide
    for i, guide in enumerate(db["guides"]):
        if str(guide["id"]) == guide_id:
            db["guides"][i] = payload # replace content

            db["opcodes"] = [o for o in db.get("opcodes", []) if str(o["guideId"]) != guide_id] # remove all old codes related to the guide
            op_codes = payload.get("opCodes", []) # extract opcodes from payload
            new_entries = [{"code": code, "guideId": guide_id} for code in op_codes] # create a new dictionary with opcodes
            db["opcodes"].extend(new_entries) # extend the list with opcodes

            # Save changes
            save_db(db)
            return {"status": "updated", "guideId": guide_id}

    raise HTTPException(status_code=404, detail="Guide nicht gefunden")

# DELETEs a guide
@router.delete("/{guide_id}")
async def delete_guide(guide_id: str, authorization: Optional[str] = Header(None)):
    verify_api_key(authorization)
    db = load_db()

    index = next((i for i, g in enumerate(db["guides"]) if str(g["id"]) == guide_id), None)
    if index is None:
        raise HTTPException(status_code=404, detail="Guide nicht gefunden")

    deleted = db["guides"].pop(index)
    db["opcodes"] = [o for o in db.get("opcodes", []) if str(o["guideId"]) != guide_id]

    save_db(db)
    return {
        "status": "deleted",
        "deletedGuideId": guide_id,
        "title": deleted["title"]
    }