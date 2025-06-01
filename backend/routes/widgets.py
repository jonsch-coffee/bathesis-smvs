# app/routes/widgets.py
from fastapi import APIRouter, Request
from fastapi.responses import Response
from config import origins_list, BASE_DIR

import os

router = APIRouter(tags=["widgets"])

# Open widget
def load_widget(widget_name):
    file_path = os.path.join(BASE_DIR, "static", widget_name)
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()

@router.get("/search-widget")
def serve_search_widget(request: Request):
    widget = load_widget("search-widget.js")
    origin = request.headers.get("origin")

    headers = {
        "Cross-Origin-Resource-Policy": "cross-origin",
        "Content-Type": "application/javascript"
    }

    if origin in origins_list:
        headers["Access-Control-Allow-Origin"] = origin

    return Response(content=widget, media_type="application/javascript", headers=headers)

@router.get("/editor-widget")
def serve_editor_widget(request: Request):
    widget = load_widget("editor-widget.js")
    origin = request.headers.get("origin")

    headers = {
        "Cross-Origin-Resource-Policy": "cross-origin",
        "Content-Type": "application/javascript"
    }

    if origin in origins_list:
        headers["Access-Control-Allow-Origin"] = origin

    return Response(content=widget, media_type="application/javascript", headers=headers)