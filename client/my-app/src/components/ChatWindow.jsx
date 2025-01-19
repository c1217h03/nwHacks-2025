import React from 'react';

export default function ChatWindow({ post, chatVisible, toggleChatWindow }) {
    function closeChatWindow() {
        toggleChatWindow(false);
    }
    return (
        <div style={chatVisible ? {} : { display: "none" }} className="chat-window">
            <div className="chat-header">
                <h3>Chat</h3>
                <button onClick={closeChatWindow} className="close-button">X</button>
            </div>
            <div className="chat-body">
                {post ? (
                    <>
                        <p><strong>Chatting about:</strong> {post.content}</p>
                        {/* Add more chat functionality */}
                    </>
                ) : (
                    <p>Select a post to chat about.</p>
                )}
            </div>
        </div>
    );
}