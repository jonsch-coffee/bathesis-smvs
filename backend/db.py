import json
from config import DB_PATH

def load_db():
    with open(DB_PATH, "r", encoding="utf-8") as file:
        return json.load(file)

def save_db(db):
    with open(DB_PATH, "w", encoding="utf-8") as file:
        json.dump(db, file, ensure_ascii=False, indent=2)