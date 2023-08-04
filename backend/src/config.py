from pydantic import BaseSettings


class Settings(BaseSettings):
    mysql_connectstring: str = ''
    secret: str = ''
    github_client_id: str = ''
    github_client_secret: str = ''
    redirect_url: str = ''

    class Config:
        env_file = '.env'


settings = Settings()
