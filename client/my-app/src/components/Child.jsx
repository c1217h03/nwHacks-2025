import React from 'react';

function Child({ child }) {
    return (
        <div className="child-card" style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
            <p><strong>First Name:</strong> {child.firstname}</p>
            <p><strong>Interests:</strong> {child.interests}</p>
            <p><strong>User ID:</strong> {child.user_id}</p>
        </div>
    );
}

export default Child;