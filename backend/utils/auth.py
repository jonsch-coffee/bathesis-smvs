from fastapi import HTTPException
from typing import Optional
from config import API_KEY

# Verifies the API_KEY for PATCH, GET and POST operations
def verify_api_key(auth: Optional[str]):
    if auth != f"Bearer {API_KEY}":
        raise HTTPException(status_code=403, detail="Ungültiger API-Key")