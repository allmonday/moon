from fastapi import APIRouter
import src.service.user.schema as user_schema

from src.service.user.config import (
    fastapi_users,
)

router = APIRouter(tags=["user"], prefix='/user')

router.include_router(fastapi_users.get_users_router(
    user_schema.UserRead, user_schema.UserUpdate))
