from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ProductDocument(BaseModel):
    name: str
    price: float = Field(..., gt=0)
    inStock: int = Field(default=0, ge=0)
    category: str
    description: str
    image_url: Optional[str] = Field(None, alias="imageUrl")
    availability: str = Field(default="Available")
    created_at: datetime = Field(default_factory=datetime.now, alias="createdAt")

    class Config:
        populate_by_name = True

class AppointmentDocument(BaseModel):
    customer_name: str = Field(..., alias="customerName")
    phone: str
    email: str
    pet_name: str = Field(..., alias="petName")
    pet_type: str = Field(..., alias="petType")
    breed: Optional[str] = "Unknown"
    age: int
    problem: str = Field(..., alias="problemDescription")
    preferred_date: str = Field(..., alias="preferredDate")
    preferred_time: str = Field(..., alias="preferredTime")
    status: str = Field(default="Pending")
    created_at: datetime = Field(default_factory=datetime.now, alias="createdAt")

    class Config:
        populate_by_name = True

class SystemSettingsDocument(BaseModel):
    hospital_name: str = Field(..., alias="hospitalName")
    emergency_number: str = Field(..., alias="emergencyNumber")
    whats_app_number: str = Field(..., alias="whatsAppNumber")

    class Config:
        populate_by_name = True
