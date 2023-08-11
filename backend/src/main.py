from fastapi import FastAPI, APIRouter, Depends

from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from fastapi.routing import APIRoute

# resource / entity
import src.router.user.router as user_router
import src.router.auth.router as auth_router
import src.router.sample.router as sample_router
import src.service.user.config as user_config

app = FastAPI()

API_PREFIX = '/api'
api_router = APIRouter(prefix=API_PREFIX)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# public, for auth
api_router.include_router(auth_router.router)


# for active users
# manually change is_super as True in DB
for router in [
    user_router,
    sample_router
]:
    api_router.include_router(router.router, dependencies=[
                              Depends(user_config.current_verified_user)])

app.include_router(api_router)


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title="Moon",
        version="0.0.1",
        description="API",
        routes=app.routes,
    )
    openapi_schema["security"] = [{"bearerAuth": []}]
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi


def use_route_names_as_operation_ids(app: FastAPI) -> None:
    """
    Simplify operation IDs so that generated API clients have simpler function
    names.

    Should be called only after all routes have been added.
    """
    for route in app.routes:
        if isinstance(route, APIRoute):
            route.operation_id = route.name  # in this case, 'read_items'


use_route_names_as_operation_ids(app)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, log_level="info")
