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

@app.route("/child", methods=["GET"])
def get_all_children():
    # Connect to the database
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Execute the query to fetch all children
        cursor.execute("SELECT * FROM child")
        children = cursor.fetchall()

        # If no children exist, return a 404 message
        if not children:
            return jsonify({"message": "No children found"}), 404

        # Format the result into a list of dictionaries
        result = [
            {
                "child_id": child[0],
                "firstname": child[1],
                "interests": child[2],
                "user_id": child[3]
            }
            for child in children
        ]

        # Return the list of children
        return jsonify(result), 200

    except Exception as e:
        # Handle any exceptions
        return jsonify({"message": f"Error fetching children: {str(e)}"}), 500

    finally:
        cursor.close()
        conn.close()

@app.route("/post", methods=["POST"])
def create_post():
    data = request.get_json()  # Get the JSON data from the request

    post_type = data.get("post_type")
    content = data.get("content")
    user_id = data.get("user_id")
    child_id = data.get("child_id")
    post_status = data.get("post_status")

    # Connect to the database
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Insert the post into the database
        cursor.execute(
            """
            INSERT INTO post (post_type, content, user_id, child_id, post_status)
            VALUES (%s, %s, %s, %s, %s)
            """,
            (post_type, content, user_id, child_id, post_status)
        )

        # Commit the transaction
        conn.commit()

        return "Post was added successfully", 201

    except Exception as e:
        # Handle any errors (e.g., foreign key violation)
        conn.rollback()
        return jsonify({"message": str(e)}), 400

    finally:
        cursor.close()
        conn.close()

@app.route("/posts", methods=["GET"])
def get_all_posts():
    # Connect to the database
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Execute the query to get all posts
        cursor.execute(
            """
            SELECT post_id, post_type, content, user_id, child_id, post_status
            FROM post;
            """
        )
        
        # Fetch all rows from the query result
        posts = cursor.fetchall()

        # Structure the data into a list of dictionaries
        post_list = []
        for post in posts:
            post_list.append({
                "post_id": post[0],
                "post_type": post[1],
                "content": post[2],
                "user_id": post[3],
                "child_id": post[4],
                "post_status": post[5]
            })

        # Return the posts as JSON
        return jsonify(post_list), 200

    except Exception as e:
        # Handle any errors
        return jsonify({"message": str(e)}), 500

    finally:
        cursor.close()
        conn.close()









if __name__ == "__main__":
    app.run(debug=True)
