from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    created_at: datetime
    
    class Config:
        orm_mode = True

# Content schemas
class ContentBase(BaseModel):
    title: Optional[str] = None
    content_type: str
    keywords: str

class ContentCreate(ContentBase):
    pass

class ContentGenerate(BaseModel):
    niche: str
    content_type: str  # blog, script, summary
    keywords: List[str]

class Content(ContentBase):
    id: int
    text: str
    created_at: datetime
    user_id: int
    
    class Config:
        orm_mode = True

# Authentication schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None