from fastapi import FastAPI, Depends, Query
from auth import verify_token, generate_token
from crud import get_guide_by_id, get_guide_by_opcode, get_all_guides, put_guide_crud, delete_guide_crud
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
generate_token()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # TODO: Replace for production. Only in TESTING!!!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/guides/{guide_id}", dependencies=[Depends(verify_token)])
def fetch_guide(guide_id: int):
    return get_guide_by_id(guide_id)

@app.get("/opcodes")
def get_opcodes(code_like: str = Query(None)):
    return get_guide_by_opcode(code_like)

@app.get("/guides")
def get_guides():
    return get_all_guides()

@app.patch("/guides/{guide_id}")
def put_guide(guide_id: int, updated: dict, credentials: dict = Depends(verify_token)):
    return put_guide_crud(guide_id, updated)

@app.delete("/guides/{guide_id}")
def delete_guide(guide_id: int, credentials: dict = Depends(verify_token)):
    return delete_guide_crud(guide_id)