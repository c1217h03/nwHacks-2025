import React from 'react';

function Child({ child }) {
    return (
        <div className="child-card" style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
            <div className="child-card-content">
                <img src={child.file_path} className = "child_image"></img>
                <div className="child-card-name-int">
                    <div>
                        <p><strong>Name:</strong> {child.firstname}</p>
                        <p><strong>Interests:</strong> {child.interests}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Child;