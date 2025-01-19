import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

export default function PostingPage() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    // Fetch posts when the component mounts
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/post')  // Correct API URL for fetching posts
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                setError('Error fetching posts');
                console.error(error);
            });
    }, []);

    return (
        <>
            <Header />
            <div className="posting-page">
                <h1>Posts</h1>
                {error ? (
                    <p>{error}</p>
                ) : (
                    posts.length > 0 ? (
                        <div className="post-list">
                            {posts.map(post => (
                                <div key={post.post_id} className="post-card">
                                    <h3>{post.post_type}</h3>
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
                            ))}
                        </div>
                    ) : (
                        <p>No posts available</p>
                    )
                )}
            </div>
        </>
    );
}

