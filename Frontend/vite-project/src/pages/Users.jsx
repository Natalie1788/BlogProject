import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAllUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:3000/api/users", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                throw new Error('Failed to fetch users');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <h1>All users</h1>
            <div className='users-container'>
                {users.length === 0 ? (
                    <p>No users found</p>
                ) : (
                    <ol style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
                    {users.map((user) => (
                        <li key={user.id}>
                            <p>{user.email}</p>
                        </li>
                    ))}
                </ol>
            )}
        </div>

        <div className='back-btn'>
        <button><Link style={{color: "yellow", textDecoration: "none"}} to="/">Back</Link></button>
        </div>
    </>
);
}