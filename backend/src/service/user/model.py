from typing import List
from fastapi_users_db_sqlalchemy import SQLAlchemyBaseOAuthAccountTableUUID, SQLAlchemyBaseUserTableUUID
from sqlalchemy import Text
from sqlalchemy.orm import Mapped, relationship, mapped_column
import src.db as db


class OAuthAccount(SQLAlchemyBaseOAuthAccountTableUUID, db.Base):
    access_token: Mapped[str] = mapped_column(Text, nullable=False)


class User(SQLAlchemyBaseUserTableUUID, db.Base):
    oauth_accounts: Mapped[List[OAuthAccount]] = relationship(
        "OAuthAccount", lazy="joined")
