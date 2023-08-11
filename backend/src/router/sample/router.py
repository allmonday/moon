from fastapi import APIRouter

router = APIRouter(tags=["sample"], prefix='/sample')


@router.get('/hello/{name}', response_model=str)
def hell(name: str):
    return f'hello {name}'
