# Capstone_WebDev
✅ Task Master
A simple and clean to-do list web app built with Flask and SQLite.

Features
Add new tasks
Update existing tasks
Delete tasks
Timestamps showing when each task was created
Tech Stack
Backend: Python, Flask, Flask-SQLAlchemy
Database: SQLite
Frontend: HTML, CSS, Jinja2 Templates
Getting Started
1. Clone the repository
git clone https://github.com/RTE404/flask-app.git
cd flask-app
2. Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate   # On Windows
3. Install dependencies
pip install -r requirements.txt
4. Run the app
python app.py
Then open your browser and go to: http://127.0.0.1:5000

Project Structure
flask_app/
├── app.py              # Main application file
├── requirements.txt    # Python dependencies
├── static/
│   └── css/
│       └── main.css    # Stylesheet
└── templates/
    ├── base.html       # Base layout
    ├── index.html      # Home page (task list)
    └── updates.html    # Update task page
