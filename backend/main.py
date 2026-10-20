from typing import Annotated
from fastapi import FastAPI
from pydantic import BaseModel, StringConstraints
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

vocabulary = {
    "apple": {"chinese": "蘋果", "jyutping": "ping4 gwo2", "english": "apple"},
    "banana": {"chinese": "香蕉", "jyutping": "hoeng1 ziu1", "english": "banana"},
}


class AnalyzeRequest(BaseModel):
    input: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1)]


@app.post("/analyze")
def analyze(request: AnalyzeRequest):
    word = vocabulary.get(request.input)
    if word is None:
        raise HTTPException(status_code=404, detail="Word not found")
    return word
