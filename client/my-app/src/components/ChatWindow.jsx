import React from 'react';
import { Send, X } from 'lucide-react';

export default function ChatWindow({ post, chatVisible, toggleChatWindow }) {
    function closeChatWindow() {
        toggleChatWindow(false);
    }
    function handleMessageChange(event) {
        setMessage(event.target.value);
    }

    function handleSendMessage(event) {
        event.preventDefault();
        // Add functionality to send the message
        console.log("Message sent:", message);
        setMessage('');
    }
    return (
        <div style={chatVisible ? {} : { display: "none" }} className="chat-window">
            <div className="chat-header">
                <div className="chat-title">
                    <h3>Chat</h3>
                </div>
                <button onClick={closeChatWindow} className="close-button"><X /></button>

            </div>
            <div>
                {post ? (
                    <div className="chat-body">
                        <div className='description'>
                            <p><strong>Chatting about:</strong> {post.content}</p>
                            {/* Add more chat functionality */}

                        </div>

                        <div className="form-container">
                            <div class="chat-form">
                                <input type="text" className="message" name="message"
                                    placeholder="Enter your message here" required />
                                <button className="chat-submit" type="submit"> <Send className='send-icon' /> </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Select a post to chat about.</p>

                )}

            </div>
        </div>
    );
}