import React from 'react';

export default function Post({ post }) {
    if (post.post_type == "look_for_work") {
        return (
            <div className="post-card">
                <h3 className="looking">Looking for work</h3>
                <p>{post.content}</p>
                <small>
                    Posted by: {post.user_firstname} {post.user_lastname}
                </small>
                {post.child_firstname && (
                    <div className="child-info">
                        <strong>Child: </strong>{post.child_firstname}
                    </div>
                )}
            </div>
        );
    }
    return (
        <div className="post-card">
            <h3 className="needed">Helper needed</h3>
            <p>{post.content}</p>
            <small>
                Posted by: {post.user_firstname} {post.user_lastname}
            </small>
        </div>
    );
}
