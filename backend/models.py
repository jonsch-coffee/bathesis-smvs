from typing import List, Optional
from pydantic import BaseModel

class Option(BaseModel):
    id: str
    label: str
    target: str

class Step(BaseModel):
    id: str
    questionTitle: str
    description: Optional[str] = ""
    options: List[Option]

class Guide(BaseModel):
    id: int
    title: str
    steps: List[Step]
    opCodes: List[str]

class OpCode(BaseModel):
    code: str
    guideId: int