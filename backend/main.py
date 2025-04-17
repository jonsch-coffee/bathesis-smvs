from fastapi import FastAPI, Query
from crud import get_guide_by_id, get_guide_by_opcode, get_all_guides, put_guide_crud, delete_guide_crud
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "https://smvs-gmbh-op-code-search-engine.onrender.com/"],  # TODO: Replace for production. Only in TESTING!!!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/guides/{guide_id}")
def fetch_guide(guide_id: int):
    return get_guide_by_id(guide_id)

@app.get("/opcodes")
def get_opcodes(
        code_like: str = Query(None),
        code: str = Query(None) # one of them works... maybe the frontend code should be optimized in a way that I don't need to optional params
):
    search_code = code_like or code # kind a like a work-around aka tmp-fix ;)
    return get_guide_by_opcode(search_code)

@app.get("/guides")
def get_guides():
    return get_all_guides()

@app.patch("/guides/{guide_id}")
def put_guide(guide_id: int, updated: dict):
    return put_guide_crud(guide_id, updated)

@app.delete("/guides/{guide_id}")
def delete_guide(guide_id: int):
    return delete_guide_crud(guide_id)