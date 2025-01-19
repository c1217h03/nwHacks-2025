from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Load configuration
    app.config.from_object('app.config.Config')

    # Initialize extensions
    db.init_app(app)
    CORS(app)  # Allow cross-origin requests

    # Register routes
    from app.routes import api_blueprint
    app.register_blueprint(api_blueprint)

    return app
