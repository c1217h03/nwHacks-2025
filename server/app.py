from flask import Flask, request, jsonify
import psycopg2
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

# Database connection setup
def get_db_connection():
    conn = psycopg2.connect(os.getenv("DATABASE_URL", "postgresql://username:password@localhost:5432/mydatabase"))
    return conn

#create a user
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

# if user already exists: {
#     "message": "duplicate key value violates unique constraint \"user_email_key\"\nDETAIL:  Key (email)=(nelsonleex@gmail.com) already exists.\n"
# } then allow the user into the main page


#make a new child
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

#delete a child
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

#edit a child's information
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

#get all children
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

#make a post
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

@app.route("/post", methods=["GET"])
def get_all_posts():
    # Connect to the database
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Execute the query to get all posts along with related user and child information
        cursor.execute(
            """
            SELECT p.post_id, p.post_type, p.content, u.user_id, u.firstname AS user_firstname, u.lastname AS user_lastname,
                   c.child_id, c.firstname AS child_firstname
            FROM post p
            JOIN "user" u ON p.user_id = u.user_id
            LEFT JOIN child c ON p.child_id = c.child_id;
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
                "user_firstname": post[4],
                "user_lastname": post[5],
                "child_id": post[6],
                "child_firstname": post[7] if post[7] else None  # Handle cases where child data might be missing
            })

        # Return the posts as JSON
        return jsonify(post_list), 200

    except Exception as e:
        # Handle any errors
        return jsonify({"message": str(e)}), 500
    
    finally:
        cursor.close()
        conn.close()


#edit a post
@app.route("/post/<int:post_id>", methods=["PUT"])
def edit_post(post_id):
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
        # Update the post in the database
        cursor.execute(
            """
            UPDATE post
            SET post_type = %s,
                content = %s,
                user_id = %s,
                child_id = %s,
                post_status = %s
            WHERE post_id = %s;
            """,
            (post_type, content, user_id, child_id, post_status, post_id)
        )

        # Check if any rows were updated
        if cursor.rowcount == 0:
            return jsonify({"message": "Post not found or no changes made"}), 404

        # Commit the transaction
        conn.commit()

        return jsonify({"message": "Post updated successfully"}), 200

    except Exception as e:
        # Handle any errors (e.g., foreign key violations)
        conn.rollback()
        return jsonify({"message": str(e)}), 400

    finally:
        cursor.close()
        conn.close()

#delete a post
@app.route("/post/<int:post_id>", methods=["DELETE"])
def delete_post(post_id):
    # Connect to the database
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Delete the post from the database
        cursor.execute(
            """
            DELETE FROM post
            WHERE post_id = %s;
            """,
            (post_id,)
        )

        # Check if any rows were deleted
        if cursor.rowcount == 0:
            return jsonify({"message": "Post not found"}), 404

        # Commit the transaction
        conn.commit()

        return jsonify({"message": "Post deleted successfully"}), 200

    except Exception as e:
        # Handle any errors
        conn.rollback()
        return jsonify({"message": str(e)}), 400

    finally:
        cursor.close()
        conn.close()

@app.route("/user/<int:user_id>", methods=["GET"])
def get_user_data(user_id):
    # Connect to the database
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Query the database to get user details, their posts, and their children
        cursor.execute(
            """
            SELECT u.user_id, u.email, u.firstname, u.lastname, 
                   p.post_id, p.post_type, p.content, p.post_status,
                   c.child_id, c.firstname AS child_firstname, c.interests AS child_interests
            FROM "user" u
            LEFT JOIN post p ON u.user_id = p.user_id
            LEFT JOIN child c ON u.user_id = c.user_id
            WHERE u.user_id = %s;
            """,
            (user_id,)
        )

        # Fetch the result
        result = cursor.fetchall()

        # If no data found for this user
        if not result:
            return jsonify({"message": "User not found."}), 404

        # Structure the response
        user_data = {
            "user_id": result[0][0],
            "email": result[0][1],
            "firstname": result[0][2],
            "lastname": result[0][3],
            "posts": [],
            "children": []
        }

        # Loop through the result to fill posts and children
        for row in result:
            post = {
                "post_id": row[4],
                "post_type": row[5],
                "content": row[6],
                "post_status": row[7]
            }
            if post["post_id"] is not None:
                user_data["posts"].append(post)

            child = {
                "child_id": row[8],
                "child_firstname": row[9],
                "child_interests": row[10]
            }
            if child["child_id"] is not None:
                user_data["children"].append(child)

        return jsonify(user_data), 200

    except Exception as e:
        # Handle any errors
        return jsonify({"message": str(e)}), 400

    finally:
        cursor.close()
        conn.close()


if __name__ == "__main__":
    app.run(debug=True)
