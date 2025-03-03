from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
from passlib.hash import bcrypt

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    contents = relationship("Content", back_populates="owner")
    
    def verify_password(self, password):
        return bcrypt.verify(password, self.hashed_password)
    
    @staticmethod
    def get_password_hash(password):
        return bcrypt.hash(password)

class Content(Base):
    __tablename__ = "contents"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content_type = Column(String)  # blog, script, summary
    text = Column(Text)
    keywords = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    user_id = Column(Integer, ForeignKey("users.id"))
    
    owner = relationship("User", back_populates="contents")