from fastapi import APIRouter

from app.routes.v1.user import router as user_router

v1_router = APIRouter(prefix="/v1", tags=["V1"])

v1_router.include_router(user_router)
