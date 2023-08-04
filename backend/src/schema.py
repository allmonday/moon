from pydantic import BaseModel
from datetime import datetime


class TimestampMixin(BaseModel):
    created_at: datetime
    updated_at: datetime
