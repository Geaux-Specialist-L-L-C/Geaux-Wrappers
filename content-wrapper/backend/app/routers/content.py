
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.openai_service import generate_content

router = APIRouter(prefix="/content", tags=["Content Generation"])

class ContentRequest(BaseModel):
    niche: str
    type: str  # e.g., "blog", "script", "summary"
    keywords: list[str]

@router.post("/")
async def generate_content_route(request: ContentRequest):
    content = generate_content(request.niche, request.type, request.keywords)
    if not content:
        raise HTTPException(status_code=400, detail="Content generation failed")
    return {"content": content}
