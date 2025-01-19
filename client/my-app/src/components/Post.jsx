// import React, { useState } from 'react';
// import { MessageCircleIcon } from 'lucide-react';
// import ChatWindow from './ChatWindow';

// export default function Post({ post }) {
//     const tagStyles = post.post_type === "look_for_work" ? "tag-looking" : "tag-needed";
//     const [isShown, setIsShown] = useState(false);

//     const toggleChatWindow = event => {
//         // 👇️ toggle shown state
//         setIsShown(current => !current);

//         // 👇️ or simply set it to true
//         // setIsShown(true);
//     };

//     return (
//         <div className="post-card">
//             <div className={`post-tag ${tagStyles}`}>
//                 {post.post_type === "look_for_work" ? "I Want to Help" : "Helper Needed"}
//             </div>
//             <p className="post-content">{post.content}</p>
//             <small className="post-author">
//                 Posted by: {post.user_firstname} {post.user_lastname}
//             </small>
//             {post.post_type === "look_for_work" && post.child_firstname && (
//                 <div className="child-info">
//                     <strong>Child: </strong>{post.child_firstname}
//                 </div>
//             )}
//             {/* <MessageCircleIcon className='chat-icon' size={24} /> */}
//             <button onClick={toggleChatWindow} className="chat-icon">   </button>

//             {/* 👇️ show elements on click */}
//             {/* {isShown && (
//                 <div>
//                     <ChatWindow />
//                 </div>
//             )} */}

//             {isShown && <ChatWindowToggle onClose={toggleChatWindow} />}

//             {/* 👇️ show component on click */}
//             {isShown && <Box />}
//         </div>
//     );
// }

// function ChatWindowToggle({ onClose }) {
//     return (
//         <div className="chat-window">
//             <div className="chat-header">
//                 <h3>Chat</h3>
//                 <button onClick={onClose} className="close-button">X</button>
//             </div>
//             <div className="chat-body">
//                 <p>Start your conversation here...</p>
//                 {/* Add more chat UI components here */}
//             </div>
//         </div>
//     );
// }


import React, { useState } from 'react';
import { MessageCircleIcon } from 'lucide-react';
// import './Post.css'; // Add CSS for styling

export default function Post({ post, onChatIconClick, setActivePost }) {
    const tagStyles = post.post_type === "look_for_work" ? "tag-looking" : "tag-needed";
    // const [isShown, setIsShown] = useState(false);

    // const toggleChatWindow = () => {
    //     setIsShown(current => !current);
    // };

    function setPostAndOpenChat() {
        setActivePost(post);
        onChatIconClick();
    }

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
            <button onClick={setPostAndOpenChat} className="chat-icon">
                <MessageCircleIcon size={24} />
            </button>

            {/* Chat Window */}
            {/* {isShown && <ChatWindow onClose={toggleChatWindow} />} */}
        </div>
    );
}

// function ChatWindow({ onClose }) {
//     return (
//         <div className="chat-window">
//             <div className="chat-header">
//                 <h3>Chat</h3>
//                 <button onClick={onClose} className="close-button">X</button>
//             </div>
//             <div className="chat-body">
//                 <p>Start your conversation here...</p>
//                 {/* Add more chat UI components here */}
//             </div>
//         </div>
//     );
// }

