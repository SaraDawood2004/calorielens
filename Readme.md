
**CalorieLens — AI-Powered Nutrition Intelligence Platform**


## Project Overview
CalorieLens is a full-stack intelligent web application that leverages Artificial Intelligence and data-driven analytics to automate dietary tracking and nutritional intelligence.

- Computer Vision for food recognition
- Backend processing for calorie and nutrient computation
- Frontend visualization for interactive nutritional analytics

It replaces traditional tracking with a fully automated, insight-driven experience, where users don’t just see calories — they understand what those calories mean.

---------------------------------------------------------------------------------------------------------------------

## Problem Statement
Traditional calorie tracking methods suffer from:
* Manual input effort
* Inaccurate estimation
* Lack of engagement
* No real-time insights
* No understanding of nutritional quality (macros like carbs, protein, fat)
CalorieLens addresses these issues by introducing:
* Image-based food detection
* Automated calorie estimation
* Automated macronutrient breakdown (carbs, protein, fat)
* Real-time visualization
* Personalized health analytics

---------------------------------------------------------------------------------------------------------------------

## Proposed Approach
### 1 Input Layer
* Users upload food images
* Users enter personal health data (age, weight, height, gender, activity level)
* System prepares inputs for both calorie AND nutrient analysis
### 2 AI Processing Layer
* Image is passed to a food classification model
* Model predicts food label
* Predicted label is mapped to calorie data + nutrient
### 3 Backend Logic Layer
* Aggregates food items and quantities
* Computes total calories and total nutrients
* Performs BMR and nutritional calculations
* Structures response as JSON
### 4 Frontend Visualization Layer
* Displays:
  * Calorie totals
  * Donut charts
  * Calorie rings
  * Nutrition tables
* Provides interactive UI feedback
### 5 Health Analysis Layer
* BMI calculation
* Daily calorie requirement estimation
* Macronutrient balance evaluation
* AI-generated meal plans
* AI-based nutrition insights

---------------------------------------------------------------------------------------------------------------------

## Why This Approach
### 1 Separation of Concerns
* Frontend → UI/UX + nutrient visualization
* Backend → calorie + nutrient computation
* AI → food classification
* Ensures:
  * maintainability
  * scalability
  * modular upgrades
### 2 API-Driven Architecture
* Nutrients + calories exposed via REST APIs
* REST APIs enable:
  * loose coupling
  * integration with mobile apps
  * future microservices expansion
### 3 AI-First Design
* Eliminates manual food logging
* Reduces user effort
* Improves usability and adoption
### 4 Real-Time Feedback
* Immediate calorie computation
* Enhances engagement and usability

---------------------------------------------------------------------------------------------------------------------

## System Architecture
```
User → React Frontend
     → Flask Backend API
         → AI Model (Food Detection)
         → Calorie Mapping
         → Nutrient Mapping
     ← Processed Data (Calories + Nutrients)
← Visualization (Charts + Macro Insights)
```
---------------------------------------------------------------------------------------------------------------------

#### **CalorieCalculator.jsx**
Core functionality page:
* Upload multiple food images
* Preview uploaded images
* Quantity input per item
* Remove items dynamically
**Backend Interaction:**
* Calls `/predict` for food detection
* Calls `/calculate-multiple` for calorie + nutrient computation
**Displays:**
* Total calorie count
* Food-wise calorie breakdown
* Macronutrient donut chart (green gradient UI)
* Hover-based nutrient contribution per food

---------------------------------------------------------------------------------------------------------------------

#### **DailyCaloriePage.jsx**
Health analytics module:
**Inputs:**
* Age
* Height
* Weight
* Gender
* Activity level
**Calculations:**
* BMR using Mifflin-St Jeor equation
* Daily calorie requirement
**Outputs:**
* Macronutrient distribution
* Nutrition table
* AI meal plan
* AI-generated insights
**UI Features:**
* Animated gradient background
* Floating food particle animations
* Interactive cards

---------------------------------------------------------------------------------------------------------------------

#### **BMICalculator.jsx**
Health classification module:
**Functionality:**
* Calculates BMI using:
  ```
  BMI = weight / height²
  ```
* Categorizes:
  * Underweight
  * Normal
  * Overweight
  * Obese
**UI Features:**
* Dynamic background color changes
* Animated transitions
* Health category visualization

---------------------------------------------------------------------------------------------------------------------

#  Backend (Flask)
## Core Responsibilities
* Handle image uploads
* Run food classification model
* Map food to calorie values
* Aggregate and compute totals calorie and nutrients
* Return structured JSON responses

---------------------------------------------------------------------------------------------------------------------

## API Endpoints
### **/predict** :-
**Input:**
* Image file
**Output:**
```
{
  "food": "rice"
}
```
---------------------------------------------------------------------------------------------------------------------

### **/calculate-multiple**
**Input:**
```
{
  "items": [
    { "food": "rice", "quantity": 2 }
  ]
}
```
**Output:**
```
{
  "items": [...],
  "total_calories": 950,
  "total_nutrients": {
    "carbs": 140,
    "protein": 60,
    "fat": 35
  }
}
```
---------------------------------------------------------------------------------------------------------------------

## Backend Components
### 1. Model Integration
* CNN or pretrained model
* Classifies food images
### 2. Calorie Mapping
* Static dataset or dictionary
* Maps food → calories
### 3. Nutrient Mapping
* nutrient_db.py
* Maps:
    * Food → carbs/protein/fat
### 3. Data Processing
* Aggregation
* Computation
* Formatting responses

--------------------------------------------------------------------------------------------------------------------

## Features
### 1. Core Features
* Food image recognition
* Calorie calculation
* Multi-image upload
* Quantity-based adjustment
### 2. Health Features
* BMI calculation
* Daily calorie requirement estimation
* Macronutrient breakdown
* Hydration and fiber recommendation
### 3. AI Features
* Nutrition insights generation
* AI-based meal planning
### 4. Visualization Features
* Donut chart
* Nutrient donut chart
* Nutrition tables
* Dynamic UI feedback
### 5. UI/UX Features
* Animated gradient backgrounds
* Floating particle animations
* Dark mode support
* Custom scrollbar
* Smooth transitions and hover effects
* Interactive nutrient hover insights

---------------------------------------------------------------------------------------------------------------------

## Technologies Used
### 1. Frontend
* React.js
* JavaScript (ES6)
* CSS3 (animations, gradients, responsive design)
### 2. Backend
* Python
* Flask
* REST API architecture
### 3. AI / ML
* Image classification model
* Rule-based AI logic (Agent.js)

---------------------------------------------------------------------------------------------------------------------

## Limitations
* Single food detection per image
* Accuracy depends on trained model
* Static calorie mapping
* No real-time camera input
* Limited personalization
* Static nutrient mapping
* No micronutrient tracking (vitamins/minerals)
* Model accuracy dependency

---------------------------------------------------------------------------------------------------------------------

## Future Scope :-
### 1. Multi-Food Detection (Primary Enhancement)
* Detect multiple food items in a single image
* Use:
  * YOLO
  * Faster R-CNN
### 2. Advanced Personalization
* Diet plans based on:
  * medical conditions
  * fitness goals
### 3.  Mobile Application
* Native Android/iOS app
### 4.  Real-Time Detection
* Camera-based live food scanning
### 5.  Cloud Deployment
* AWS / Firebase hosting
* Scalable backend services
### 6. Analytics Dashboard
* Weekly reports
* Calorie trends
* Health scoring

---------------------------------------------------------------------------------------------------------------------

## Execution
* frontend -> npm start
* backend -> py app.py

---------------------------------------------------------------------------------------------------------------------

## Conclusion
CalorieLens demonstrates a practical and scalable implementation of AI in healthcare-focused applications. By combining computer vision, backend processing, and modern UI/UX practices, the system delivers an intuitive and efficient solution for nutrition tracking.
The project highlights:
* Real-world AI integration
* Strong system design principles
* Clean and interactive user experience
* Scalability for future enhancements

---------------------------------------------------------------------------------------------------------------------

### New Update
- Nutrients are also classified from the image, visualized with distribution