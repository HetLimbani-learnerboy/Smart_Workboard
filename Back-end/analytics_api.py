from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/company-turnover")
async def get_turnover():
    return {
        "turnover": [
            {"department": "Engineering", "value": 20},
            {"department": "HR", "value": 10},
            {"department": "Sales", "value": 5},
            {"department": "Support", "value": 5},
            {"department": "Tester", "value": 8},
            {"department": "Designer", "value": 12},
        ]
    }

@app.get("/company-growth")
async def get_growth():
    return {
        "growth": [
            {"month": "Jan", "employees": 12},
            {"month": "Feb", "employees": 17},
            {"month": "Mar", "employees": 20},
            {"month": "Apr", "employees": 30},
            {"month": "May", "employees": 60},
        ]
    }

@app.get("/company-revenue")
async def get_revenue():
    return {
        "revenue": [
            {"quarter": "Q1", "revenue": 150000},
            {"quarter": "Q2", "revenue": 200000},
            {"quarter": "Q3", "revenue": 175000},
            {"quarter": "Q4", "revenue": 200000},
        ]
    }

@app.get("/company-attrition")
async def get_attrition():
    return {
        "attrition": [
            {"month": "Jan", "rate": 5},
            {"month": "Feb", "rate": 4.5},
            {"month": "Mar", "rate": 4},
            {"month": "Apr", "rate": 3.8},
            {"month": "May", "rate": 3.5},
            {"month": "Jun", "rate": 3.2},
        ]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)


#uvicorn analytics_api:app --reload --port 8000
#python analytics_api.py  