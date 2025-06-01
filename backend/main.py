from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import origins_list
from routes import guides, opcodes, widgets, default

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(default.router)
app.include_router(guides.router)
app.include_router(opcodes.router)
app.include_router(widgets.router)