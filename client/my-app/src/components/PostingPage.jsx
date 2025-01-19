import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Post from './Post';

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
                                <Post key={post.post_id} post={post} />
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

