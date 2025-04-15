import os
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from settings import SECRET_KEY

security = HTTPBearer()
CLAIMS = {"app": "smvs_op-search"}
print("🔐 Loaded SECRET_KEY:", SECRET_KEY)

def generate_token():
    token = jwt.encode(CLAIMS, SECRET_KEY, algorithm="HS256")
    print("🔐 JWT:", token)

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=["HS256"])
        if not (payload == CLAIMS): # reminder: if more claims are added this "simple" approach won't work ;P
            raise HTTPException(status_code=403, detail="Invalid claims")

        return payload
    except JWTError:
        raise HTTPException(status_code=403, detail="Invalid token")