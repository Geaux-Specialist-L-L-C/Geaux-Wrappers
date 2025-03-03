from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app import models
from app.database import get_db
from app.routers.auth import get_current_user

router = APIRouter()

@router.get("/")
async def get_analytics(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Count content by type
    content_by_type = db.query(
        models.Content.content_type,
        func.count(models.Content.id).label("count")
    ).filter(
        models.Content.user_id == current_user.id
    ).group_by(
        models.Content.content_type
    ).all()
    
    # Extract most used keywords
    keyword_counts = {}
    user_contents = db.query(models.Content).filter(
        models.Content.user_id == current_user.id
    ).all()
    
    for content in user_contents:
        keywords = content.keywords.split(",")
        for keyword in keywords:
            keyword = keyword.strip()
            if keyword:
                keyword_counts[keyword] = keyword_counts.get(keyword, 0) + 1
    
    top_keywords = sorted(
        [{"keyword": k, "count": v} for k, v in keyword_counts.items()],
        key=lambda x: x["count"],
        reverse=True
    )[:10]
    
    return {
        "content_by_type": [{"type": t, "count": c} for t, c in content_by_type],
        "top_keywords": top_keywords,
        "total_content": len(user_contents)
    }