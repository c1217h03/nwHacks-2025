import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import Axios for making HTTP requests
import Child from "./Child";

export default function KidsList() {
    const [children, setChildren] = useState([]);  // State to store fetched children data
    const [error, setError] = useState(null);       // State to handle errors

    // Fetch children data when the component mounts
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/child')  // Replace with your actual API URL
            .then(response => {
                setChildren(response.data);  // Store the fetched data
            })
            .catch(error => {
                setError('Error fetching children data');  // Handle errors
                console.error(error);
            });
    }, []);  // Empty dependency array to run only once when the component mounts

    return (
        <div className="kids-list">
            <div className="header-bar" style={{ padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100vw' }}>
                <div style={{ marginLeft: 'auto', marginRight: '30px', display: 'flex' }}>
                    <img src="/logo.jpg" alt="Logo" style={{ marginRight: '75vw', width: '50px', height: '50px' }} />
                    <button style={{ margin: '0 10px', padding: '5px 10px' }}>Home</button>
                    <button style={{ margin: '0 10px', padding: '5px 10px' }}>Profile</button>
                    <button style={{ margin: '0 10px', padding: '5px 10px' }}>Logout</button>
                </div>
            </div >

            <div className="kids-list-body">

                <div className="kids">
                    {error ? (
                        <p>{error}</p>  // Display error message if any error occurs
                    ) : (
                        children.length > 0 ? (
                            children.map(child => (
                                <Child key={child.child_id} child={child} />
                            ))
                        ) : (
                            <p>No children available</p>  // If no children exist
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
