import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Post from './Post';
import ChatWindow from './ChatWindow';

export default function PostingPage() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [isChatWindowShown, setIsChatWindowShown] = useState(false);
    const [activePost, setActivePost] = useState(null);

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

    // const toggleChatWindow = () => {
    //     setIsChatWindowShown(current => !current);
    // };
    function openChatWindow() {
        setIsChatWindowShown(true);
    }

    return (
        <>
            <Header />
            <div className="posting-page">
                <div>
                    <h1 className="posting-page-title">Community Posts</h1>
                    {error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        posts.length > 0 ? (
                            <div className="post-list">
                                {posts.map(post => (
                                    <Post key={post.post_id} post={post} onChatIconClick={openChatWindow} setActivePost={setActivePost} />
                                ))}
                            </div>
                        ) : (
                            <p className="loading-message">Loading posts...</p>
                        )
                    )}
                </div>
                <ChatWindow post={activePost} chatVisible={isChatWindowShown} toggleChatWindow={setIsChatWindowShown} />

                {/* {isChatWindowShown && (
                    <div className="chat-window-container">
                        <ChatWindow onClose={toggleChatWindow} />
                    </div>
                )} */}
            </div>
        </>
    );
}


