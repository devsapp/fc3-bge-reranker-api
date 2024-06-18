from typing import List, Union, Dict, Any
from pydantic import BaseModel, Field



class RerankRequest(BaseModel):
    query: str=Field(alias="query")
    compare_to_sentences:  List[str]=Field(alias="compare_to")

class RerankResponse(BaseModel):
    data: Any
    object:str

