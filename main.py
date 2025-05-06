from fastapi import FastAPI, Query
from typing import List, Optional

app = FastAPI()

# Sample database of SHL assessments
assessments_db = [
    {
        "id": 1,
        "name": "Java Developer Test",
        "url": "https://www.shl.com/java-test",
        "duration": 45,
        "remote_support": "Yes",
        "adaptive_support": "No",
        "test_type": ["Programming", "Cognitive"]
    },
    {
        "id": 2,
        "name": "Python Programming Test", 
        "url": "https://www.shl.com/python-test",
        "duration": 40,
        "remote_support": "Yes",
        "adaptive_support": "No",
        "test_type": ["Programming"]
    },
    {
        "id": 3,
        "name": "Cognitive Ability Test",
        "url": "https://www.shl.com/cognitive-test",
        "duration": 60,
        "remote_support": "Yes",
        "adaptive_support": "Yes",
        "test_type": ["Cognitive"]
    }
]

@app.get("/")
def home():
    return {"message": "SHL Assessment API is running"}

@app.get("/assessments")
def search_assessments(
    search_query: str = Query(..., description="Text to search in assessment names"),
    max_duration: Optional[int] = Query(None, description="Maximum test duration in minutes"),
    test_type: Optional[str] = Query(None, description="Filter by test type (e.g., 'Programming')"),
    remote_supported: Optional[bool] = Query(None, description="Filter by remote support (True/False)")
):
    """
    Search SHL assessments with filters.
    Returns JSON list of matching assessments.
    """
    results = []
    for test in assessments_db:
        # Check search query match
        if search_query.lower() not in test["name"].lower():
            continue
        
        # Apply filters
        if max_duration and test["duration"] > max_duration:
            continue
        if test_type and test_type not in test["test_type"]:
            continue
        if remote_supported is not None:
            if remote_supported and test["remote_support"] != "Yes":
                continue
            if not remote_supported and test["remote_support"] == "Yes":
                continue
        
        results.append(test)
    
    return {"count": len(results), "assessments": results}