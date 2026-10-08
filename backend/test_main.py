from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_analyze_valid_input():
    response = client.post("/analyze", json={"input": "banan"})
    assert response.status_code == 200
    assert response.json() == {"message": "valid banan"}


def test_analyze_invalid_input():
    response = client.post("/analyze", json={"input": ""})
    assert response.status_code == 422


def test_analyze_white_space_input():
    response = client.post("/analyze", json={"input": "   "})
    assert response.status_code == 422
