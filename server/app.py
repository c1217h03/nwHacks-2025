from flask import Flask, request, jsonify
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Database connection setup
def get_db_connection():
    conn = psycopg2.connect(os.getenv("DATABASE_URL", "postgresql://username:password@localhost:5432/mydatabase"))
    return conn

# API to create a user
@app.route("/user", methods=["POST"])
def create_user():
    data = request.get_json()  # Get the JSON data from the request

    email = data.get("email")
    firstname = data.get("firstname")
    lastname = data.get("lastname")

    # Insert the user into the database
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            INSERT INTO "user" (email, firstname, lastname)
            VALUES (%s, %s, %s)
            RETURNING user_id, email, firstname, lastname;
            """,
            (email, firstname, lastname)
        )

        # Commit the transaction
        conn.commit()

    except Exception as e:
        # Handle any errors (e.g., unique constraint violation for email)
        conn.rollback()
        return jsonify({"message": str(e)}), 400
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    app.run(debug=True)
