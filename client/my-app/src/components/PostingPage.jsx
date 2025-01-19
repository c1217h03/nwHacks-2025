import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Post from './Post';

export default function PostingPage() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/post')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                setError('Error fetching posts');
                console.error(error);
            });
            document.title = 'Postings';
    }, []);

    return (
        <>
            <Header />
            <div className="posting-page">
                <h1 className="posting-page-title">Community Posts</h1>
                {error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    posts.length > 0 ? (
                        <div className="post-list">
                            {posts.map(post => (
                                <Post key={post.post_id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <p className="loading-message">Loading posts...</p>
                    )
                )}
            </div>
        </>
    );
}
