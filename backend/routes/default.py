from fastapi import APIRouter
from fastapi.responses import RedirectResponse

router = APIRouter()

## Default route. Redirect to API-Docs
@router.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/docs")