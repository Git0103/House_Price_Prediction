# House Price Prediction

A machine learning project that predicts house prices based on various features using Python (FastAPI) for the backend and React (Vite) for the frontend.

## Setup Instructions

### Backend Setup

1. Create a virtual environment (recommended):
```bash
python -m venv venv
venv\Scripts\activate
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Run the backend server:
```bash
cd backend
uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Install Node.js dependencies:
```bash
cd frontend
npm install
```

2. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Features

- Input form for house features (area, bedrooms, bathrooms)
- Real-time price prediction
- Modern UI with Material-UI components
- RESTful API backend
- Machine learning model using Random Forest Regressor

## API Endpoints

- `GET /`: Welcome message
- `POST /predict`: Predict house price based on input features
