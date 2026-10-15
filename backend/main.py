from typing import Annotated
from fastapi import FastAPI
from pydantic import BaseModel, StringConstraints
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)


class AnalyzeRequest(BaseModel):
    input: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1)]


@app.post("/analyze")
def analyze(request: AnalyzeRequest):
    return {"message": f"valid {request.input}"}
