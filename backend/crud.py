import json
from typing import List
from xml.etree.ElementTree import tostring

from fastapi import HTTPException

from models import Guide, OpCode

DB_PATH = "db.json"

def read_data():
    with open(DB_PATH) as f:
        return json.load(f)

def write_data(data):
    with open(DB_PATH, "w") as f:
        json.dump(data, f, indent=2)

# Fetch a specific guide
def get_guide_by_id(guide_id: int) -> Guide:
    db = read_data()
    return next((g for g in db["guides"] if g["id"] == guide_id), None) # ??

# Type Ahead suggestions based on a gißven op-code
def get_guide_by_opcode(code_like: int) -> OpCode:
    db = read_data()
    matches = [c for c in db["opcodes"] if c["code"].startswith(code_like)][:2]
    if(matches):
        return matches
    raise HTTPException(status_code=404, detail="Keine passenden OP-Codes gefunden")

# Get all guides
def get_all_guides():
    db = read_data()
    return db["guides"]

def put_guide_crud(guide_id: int, updated: dict):
    db = read_data()

    # 1. Guide aktualisieren oder hinzufügen
    for i, g in enumerate(db["guides"]):
        if g["id"] == guide_id:
            db["guides"][i] = updated
            break
    else:
        db["guides"].append(updated)

    # 2. OP-Codes aktualisieren
    # Entferne zuerst alle alten OP-Codes, die diesem Guide zugewiesen waren
    db["opcodes"] = [op for op in db["opcodes"] if op["guideId"] != guide_id]

    # Füge neue OP-Codes hinzu
    for code in updated.get("opCodes", []):
        db["opcodes"].append({
            "code": code,
            "guideId": guide_id
        })

    write_data(db)
    return updated


def delete_guide_crud(guide_id: int):
    db = read_data()

    # Guide löschen
    new_guides = [g for g in db["guides"] if g["id"] != guide_id]
    if len(new_guides) == len(db["guides"]):
        raise HTTPException(status_code=404, detail="Guide not found")
    db["guides"] = new_guides

    # Verknüpfte OP-Codes entfernen
    db["opcodes"] = [o for o in db["opcodes"] if o["guideId"] != guide_id]

    write_data(db)
    return {"message": f"Guide {guide_id} wurde erfolgreich gelöscht."}