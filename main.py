from fastapi import FastAPI
from typing import List

app = FastAPI()

# Sample database of SHL assessments
assessments_db = [
    {
        "name": "Java Developer Test",
        "url": "https://www.shl.com/java-test",
        "duration": 45,
        "remote_support": "Yes",
        "adaptive_support": "No",
        "test_type": ["Programming", "Cognitive"]
    },
    {
        "name": "Python Programming Test", 
        "url": "https://www.shl.com/python-test",
        "duration": 40,
        "remote_support": "Yes",
        "adaptive_support": "No",
        "test_type": ["Programming"]
    }
]

@app.get("/")
def home():
    return {"message": "SHL Assessment API is running"}

@app.get("/recommend")
def recommend(query: str, max_duration: int = None):
    """Get recommendations based on query and optional filters"""
    results = []
    for test in assessments_db:
        if query.lower() in test["name"].lower():
            if max_duration and test["duration"] > max_duration:
                continue
            results.append(test)
    return {"recommendations": results[:10]}  # Return max 10 results