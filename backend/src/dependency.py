from fastapi import Depends
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase
from sqlalchemy.ext.asyncio import AsyncSession
from src.db import async_session
from fastapi.security import HTTPBearer
from src.service.user import model as user_model

auth_scheme = HTTPBearer()


async def get_async_session():
    async with async_session() as session:
        yield session


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, user_model.User, user_model.OAuthAccount)
