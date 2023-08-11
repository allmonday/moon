from fastapi import APIRouter
from src.config import settings
# auth & users

from src.service.user.config import (
    SECRET,
    auth_backend,
    fastapi_users,
    oauth_client
)

router = APIRouter(tags=["auth"], prefix='/auth')

# auth and users
router.include_router(fastapi_users.get_auth_router(
    auth_backend), prefix="/jwt")

# router.include_router(fastapi_users.get_register_router(model_schema.UserRead, model_schema.UserCreate))
# router.include_router(fastapi_users.get_reset_password_router())
# router.include_router( fastapi_users.get_verify_router(model_schema.UserRead))

router.include_router(
    fastapi_users.get_oauth_router(
        oauth_client,
        auth_backend,
        SECRET,
        redirect_url=settings.redirect_url,  # loop from frontend
        # is_verified_by_default=True
        is_verified_by_default=False),
    prefix="/github",
)
