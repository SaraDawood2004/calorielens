from flask import Flask, request, jsonify
from flask_cors import CORS
import os

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from predict_food import predict
from calorie_calculator import calculate
from nutrient_calculator import get_nutrients

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/")
def home():
    return {
        "message": "Welcome to CalorieLens API",
        "endpoints": {
            "/predict": "POST - Upload image to detect food",
            "/calculate": "POST - Send food + quantity to calculate calories",
            "/calculate-multiple": "POST - Send multiple foods to calculate total calories",
            "/analyze": "POST - Upload image + quantity to get food and calories",
            "/send-contact": "POST - Send contact form data to receive email"
        }
    }
# -----------------------
# EMAIL CONFIGURATION
# -----------------------
SENDER_EMAIL = "hello.calorielens@gmail.com"
APP_PASSWORD = "jdjxvzdeqzsgurvo"  # Make sure to secure this with env vars in production

# -----------------------
# CONTACT ROUTE
# -----------------------
@app.route("/send-contact", methods=["POST"])
def send_contact():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    rating = data.get("rating")
    message = data.get("message")

    if not all([name, email, rating, message]):
        return jsonify({"status": "error", "message": "All fields are required"}), 400

    try:
        # MAIL TO YOU
        msg = MIMEMultipart()
        msg["From"] = SENDER_EMAIL
        msg["To"] = SENDER_EMAIL
        msg["Subject"] = "New Contact Message - CalorieLens"

        body = f"""
Name: {name}
Email: {email}
Rating: {rating}

Message:
{message}
"""
        msg.attach(MIMEText(body, "plain"))

        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(SENDER_EMAIL, APP_PASSWORD)
        server.sendmail(SENDER_EMAIL, SENDER_EMAIL, msg.as_string())

        # AUTO REPLY MAIL
        reply = MIMEMultipart()
        reply["From"] = SENDER_EMAIL
        reply["To"] = email
        reply["Subject"] = "Thank you for contacting CalorieLens"

        reply_body = f"""
Hello {name},

Thank you for reaching out to CalorieLens.

We have received your message and our team will review it shortly.
Your feedback helps us improve our AI-powered nutrition platform.

Stay healthy,
CalorieLens Team
"""
        reply.attach(MIMEText(reply_body, "plain"))
        server.sendmail(SENDER_EMAIL, email, reply.as_string())
        server.quit()

        return jsonify({"status": "success"})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

# -------------------------
# FOOD PREDICTION
# -------------------------
@app.route("/predict", methods=["POST"])
def predict_food_api():

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image = request.files["image"]

    image_path = os.path.join(UPLOAD_FOLDER, image.filename)
    image.save(image_path)

    food = predict(image_path)

    return jsonify({
        "food": food
    })


# -------------------------
# SINGLE FOOD CALCULATION
# -------------------------
@app.route("/calculate", methods=["POST"])
def calculate_calories():

    data = request.json

    food = data.get("food")
    quantity = data.get("quantity")

    if food is None or quantity is None:
        return jsonify({"error": "food and quantity required"}), 400

    quantity = int(quantity)

    calories = calculate(food, quantity)

    return jsonify({
        "food": food,
        "quantity": quantity,
        "total_calories": calories
    })


# -------------------------
# MULTIPLE FOOD CALCULATION
# -------------------------
@app.route("/calculate-multiple", methods=["POST"])
def calculate_multiple():

    data = request.json
    items = data.get("items")

    if not items:
        return jsonify({"error": "items list required"}), 400

    results = []
    total_calories = 0

    total_nutrients = {
        "carbs": 0,
        "protein": 0,
        "fat": 0
    }

    for item in items:

        food = item.get("food")
        quantity = int(item.get("quantity", 1))

        calories = calculate(food, quantity)

        nutrients = get_nutrients(food, quantity)

        total_calories += calories

        if nutrients:
            total_nutrients["carbs"] += nutrients.get("carbs", 0)
            total_nutrients["protein"] += nutrients.get("protein", 0)
            total_nutrients["fat"] += nutrients.get("fat", 0)
        else:
            nutrients = {
                "carbs": 0,
                "protein": 0,
                "fat": 0
            }

        results.append({
            "food": food,
            "quantity": quantity,
            "calories": calories,
            "nutrients": nutrients   
        })

    return jsonify({
        "items": results,
        "total_calories": total_calories,
        "total_nutrients": total_nutrients   
    })

# -------------------------
# FULL PIPELINE
# -------------------------
@app.route("/analyze", methods=["POST"])
def analyze_food():

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    quantity = request.form.get("quantity")

    if quantity is None:
        return jsonify({"error": "Quantity is required"}), 400

    quantity = int(quantity)

    image = request.files["image"]

    image_path = os.path.join(UPLOAD_FOLDER, image.filename)
    image.save(image_path)

    food = predict(image_path)

    calories = calculate(food, quantity)

    nutrients = get_nutrients(food, quantity)

    return jsonify({
        "food": food,
        "quantity": quantity,
        "total_calories": calories,
        "nutrients": nutrients
    })


if __name__ == "__main__":
    app.run(debug=True)