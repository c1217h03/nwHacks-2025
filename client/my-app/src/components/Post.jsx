import React from 'react';

export default function Post({ post }) {
    if (post.post_type == "look_for_work") {
        return (
            <div className="post-card">
                <div className="looking">
                    <h4>Looking for work</h4>
                </div>
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
            <div className="needed">
                <h4>Helper Needed</h4>
            </div>
            <p>{post.content}</p>
            <small>
                Posted by: {post.user_firstname} {post.user_lastname}
            </small>
        </div>
    );
}
