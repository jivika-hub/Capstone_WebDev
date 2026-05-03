from flask import Flask, jsonify, request
from supabase import create_client
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 🔑 SUPABASE CONNECTION
url = "https://mlqzjzqxgvooirgcuubm.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1scXpqenF4Z3Zvb2lyZ2N1dWJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzcyNTMyNCwiZXhwIjoyMDkzMzAxMzI0fQ.MmS2oUDPr94eXDJ0FF_S4xhMVYCYV5tL2ZzJiqKpaGQ"
supabase = create_client(url, key)

# 📥 GET ITEMS
@app.route('/items', methods=['GET'])
def get_items():
    response = supabase.table('items').select("*").execute()
    return jsonify(response.data)

# ➕ ADD ITEM
@app.route('/add', methods=['POST'])
def add_item():
    data = request.json

    supabase.table('items').insert({
        "title": data["title"],
        "description": data["description"],
        "location": data["location"],
        "status": data["status"],
        "image": data["image"]
    }).execute()

    return jsonify({"message": "Item added"})

if __name__ == "__main__":
    app.run(debug=True)