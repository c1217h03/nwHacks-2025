import React from 'react';

export default function Post({ post }) {
    const tagStyles = post.post_type === "look_for_work" ? "tag-looking" : "tag-needed";

    return (
        <div className="post-card">
            <div className={`post-tag ${tagStyles}`}>
                {post.post_type === "look_for_work" ? "I Want to Help" : "Helper Needed"}
            </div>
            <p className="post-content">{post.content}</p>
            <small className="post-author">
                Posted by: {post.user_firstname} {post.user_lastname}
            </small>
            {post.post_type === "look_for_work" && post.child_firstname && (
                <div className="child-info">
                    <strong>Child: </strong>{post.child_firstname}
                </div>
            )}
        </div>
    );
}
