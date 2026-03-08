# Bloom 🌱
AI-powered crop disease detection and monitoring platform for farmers.  

Bloom allows users to upload an image of a plant leaf, detect potential crop diseases using a machine learning model, generate treatment and prevention recommendations using Gemini AI, and store diagnosis reports in a PostgreSQL database to track disease trends.  

The long-term goal is to help farmers detect crop diseases early while building a dataset that can help identify regional outbreaks.  

## Problem
Crop diseases significantly impact agricultural productivity. Early detection is often difficult without expert knowledge, and farmers may not have immediate access to agronomists.  

Bloom helps address this by providing:
- AI-based plant disease detection
- Automated treatment recommendations
- Crowdsourced disease monitoring

## Core Features
### Image-Based Disease Detection
Users upload an image of a crop leaf. A machine learning model analyzes the image and predicts the most likely disease.

### AI Treatment Recommendations
Once a disease is detected, Gemini AI generates treatment and prevention guidance tailored to the crop.

### Diagnosis Logging
Each diagnosis is stored in PostgreSQL, allowing the system to track disease occurrences.

### Disease Analytics
Stored diagnoses can later be used to analyze trends and detect potential outbreaks.

## Tech Stack
### Frontend
Next.js (App Router)  
React  
Tailwind CSS  

### Backend
Next.js API Routes (Route Handlers)

### AI / ML
Plant disease detection model (external ML service or API)  
Google Gemini API for treatment recommendations  

### Database
PostgreSQL

## Setup (Development)
### Install dependencies:
```bash
npm install
```

### Set environment variables:
```.env.local
DATABASE_URL=
GEMINI_API_KEY=
ML_SERVICE_URL=
```

### Run development server:
```bash
npm run dev
```

## Authors
- Louis Nguyen
