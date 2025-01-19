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

        return "user was added successfully"

    except Exception as e:
        # Handle any errors (e.g., unique constraint violation for email)
        conn.rollback()
        return jsonify({"message": str(e)}), 400
    finally:
        cursor.close()
        conn.close()

@app.route("/child", methods=["POST"])
def create_child():
    data = request.get_json()  # Get the JSON data from the request

    firstname = data.get("firstname")
    interests = data.get("interests")
    user_id = data.get("user_id")

    # Insert the user into the database
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            INSERT INTO "child" (firstname, interests, user_id)
            VALUES (%s, %s, %s)
            """,
            (firstname, interests, user_id)
        )

        # Commit the transaction
        conn.commit()

        return "child was added successfully"

    except Exception as e:
        # Handle any errors (e.g., unique constraint violation for email)
        conn.rollback()
        return jsonify({"message": str(e)}), 400
    finally:
        cursor.close()
        conn.close()

@app.route('/child/<int:child_id>', methods=['DELETE'])
def delete_child(child_id):
    # Connect to the database
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Check if the child exists before attempting to delete
        cursor.execute("SELECT * FROM child WHERE child_id = %s", (child_id,))
        child = cursor.fetchone()

        if not child:
            return jsonify({"message": f"Child with id {child_id} not found"}), 404

        # Perform the delete operation
        cursor.execute("DELETE FROM child WHERE child_id = %s", (child_id,))
        conn.commit()

        return jsonify({"message": f"Child with id {child_id} has been deleted"}), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"message": f"Error deleting child: {str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()


@app.route("/child/<int:child_id>", methods=["PUT"])
def edit_child(child_id):
    data = request.get_json()  # Get the JSON data from the request

    firstname = data.get("firstname")
    interests = data.get("interests")
    user_id = data.get("user_id")

    # Connect to the database
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Check if the child exists
        cursor.execute("SELECT * FROM child WHERE child_id = %s", (child_id,))
        child = cursor.fetchone()

        if not child:
            return jsonify({"message": f"Child with id {child_id} not found"}), 404

        # Update the child record
        cursor.execute(
            """
            UPDATE "child"
            SET firstname = %s, interests = %s, user_id = %s
            WHERE child_id = %s
            """,
            (firstname, interests, user_id, child_id)
        )

        # Commit the transaction
        conn.commit()

        return jsonify({"message": f"Child with id {child_id} has been updated successfully"}), 200

    except Exception as e:
        # Handle any errors
        conn.rollback()
        return jsonify({"message": str(e)}), 400

    finally:
        cursor.close()
        conn.close()






if __name__ == "__main__":
    app.run(debug=True)
