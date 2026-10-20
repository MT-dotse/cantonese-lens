from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_analyze_valid_input():
    response = client.post("/analyze", json={"input": "apple"})

    assert response.status_code == 200
    assert response.json()["chinese"] == "蘋果"
    assert response.json()["jyutping"] == "ping4 gwo2"
    assert response.json()["english"] == "apple"


def test_analyze_invalid_input():
    response = client.post("/analyze", json={"input": ""})
    assert response.status_code == 422


def test_analyze_white_space_input():
    response = client.post("/analyze", json={"input": "   "})
    assert response.status_code == 422


def test_analyze_unknown_word():
    response = client.post("/analyze", json={"input": "orange"})
    assert response.status_code == 404
    assert response.json()["detail"] == "Word not found"
