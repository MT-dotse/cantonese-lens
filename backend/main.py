from typing import Annotated
from fastapi import FastAPI
from pydantic import BaseModel, StringConstraints

app = FastAPI()


class AnalyzeRequest(BaseModel):
    input: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1)]


@app.post("/analyze")
def analyze(request: AnalyzeRequest):
    return {"message": f"valid {request.input}"}
