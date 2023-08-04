from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
import src.config as config

async_connstr = f'mysql+asyncmy://{config.settings.mysql_connectstring}'
async_db_engine = create_async_engine(async_connstr,
                                      echo=False,
                                      pool_recycle=3600,
                                      pool_pre_ping=True)

async_session = async_sessionmaker(
    expire_on_commit=False, bind=async_db_engine)


class Base(DeclarativeBase):
    pass
