CREATE TABLE "user"(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(50),
    firstname TEXT,
    lastname TEXT,
    UNIQUE (email)
);

CREATE TABLE child(
    child_id SERIAL PRIMARY KEY,
    firstname TEXT,
    interests TEXT,
    user_id INT,
        CONSTRAINT fk_user_child
        FOREIGN KEY (user_id)
        REFERENCES "user"(user_id)
        ON DELETE CASCADE
)

CREATE TABLE post(
    post_id SERIAL PRIMARY KEY,
    post_type TEXT,
    content TEXT,
    user_id INT
        CONSTRAINT fk_user_post
        FOREIGN KEY (user_id)
        REFERENCES "user"(user_id)
        ON DELETE CASCADE,
    child_id INT
        CONSTRAINT fk_child_post
        FOREIGN KEY (child_id)
        REFERENCES child(child_id)
        ON DELETE CASCADE,
    post_status BOOLEAN NOT NULL
)


