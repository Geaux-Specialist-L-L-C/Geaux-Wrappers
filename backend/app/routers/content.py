from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import schemas, models
from app.database import get_db
from app.routers.auth import get_current_user
from app.services.openai_service import generate_content

router = APIRouter()

@router.post("/generate", response_model=dict)
async def generate_content_route(
    request: schemas.ContentGenerate,
    current_user: models.User = Depends(get_current_user)
):
    content = generate_content(request.niche, request.content_type, request.keywords)
    if not content:
        raise HTTPException(status_code=400, detail="Content generation failed")
    return {"content": content}

@router.post("/save", response_model=schemas.Content)
async def save_content(
    content_data: schemas.ContentCreate,
    content_text: str,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_content = models.Content(
        title=content_data.title,
        content_type=content_data.content_type,
        keywords=content_data.keywords,
        text=content_text,
        user_id=current_user.id
    )
    
    db.add(db_content)
    db.commit()
    db.refresh(db_content)
    
    return db_content

@router.get("/history", response_model=List[schemas.Content])
async def get_content_history(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    contents = db.query(models.Content).filter(
        models.Content.user_id == current_user.id
    ).order_by(models.Content.created_at.desc()).offset(skip).limit(limit).all()
    
    return contents

@router.get("/{content_id}", response_model=schemas.Content)
async def get_content(
    content_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    content = db.query(models.Content).filter(
        models.Content.id == content_id,
        models.Content.user_id == current_user.id
    ).first()
    
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    
    return content