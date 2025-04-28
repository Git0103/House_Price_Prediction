from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import joblib
import os

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load or train model
model_path = "model.joblib"
if os.path.exists(model_path):
    model = joblib.load(model_path)
else:
    # Sample data with INR values
    data = {
        'area': [1000, 1500, 2000, 2500, 3000],
        'bedrooms': [2, 3, 3, 4, 4],
        'bathrooms': [1, 2, 2, 3, 3],
        'price': [25000000, 37500000, 50000000, 62500000, 75000000]  # Prices in INR
    }
    df = pd.DataFrame(data)
    X = df[['area', 'bedrooms', 'bathrooms']]
    y = df['price']
    model = RandomForestRegressor()
    model.fit(X, y)
    joblib.dump(model, model_path)

class HouseFeatures(BaseModel):
    area: float
    bedrooms: int
    bathrooms: int

@app.get("/")
async def root():
    return {"message": "House Price Prediction API"}

@app.post("/predict")
async def predict_price(features: HouseFeatures):
    input_data = np.array([[features.area, features.bedrooms, features.bathrooms]])
    prediction = model.predict(input_data)
    return {"predicted_price": float(prediction[0])} 