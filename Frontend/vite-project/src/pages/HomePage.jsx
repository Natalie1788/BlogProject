/*export default function Homepage() {
    return (
        <>
        <h1>Welcome to home page</h1>
        <p style={{textAlign: "center"}}>Here can you find much intresting communication</p>
        </>
    )
}*/
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
    const [latestPosts, setLatestPosts] = useState([]);
    const [latestUsers, setLatestUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getLatestContent = async () => {
        try {
            //const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:3000/api/latest", {
                headers: {
                    'Content-Type': 'application/json',
                    
                }
            });

            if (response.ok) {
                const data = await response.json();
                setLatestPosts(data.latestPosts);
                setLatestUsers(data.latestUsers);
            } else {
                throw new Error('Failed to fetch latest content');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getLatestContent();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <h1>Welcome to our webplace!</h1>
            <p className='centered'>Here can you find much intresting communication</p>
            <div>
                <h2 style={{textAlign: "center", marginTop: "50px"}}>Latest Posts</h2>
                <div>
                    {latestPosts.length === 0 ? (
                        <p className='centered'>No posts found</p>
                    ) : (
                        <ul className='last-posts'>
                            {latestPosts.map((post) => (
                                <li className='post' key={post.id}>
                                    <p className='post-title'>{post.title}</p>
                                    <p className='post-content'>{post.content}</p>
                                    
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div>
                <h2 style={{textAlign: "center", marginTop: "50px"}}>Latest Users</h2>
                <div className='users-container'>
                    {latestUsers.length === 0 ? (
                        <p className='centered'>No users found</p>
                    ) : (
                        <ul style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
                            {latestUsers.map((user) => (
                                <li key={user.id}>
                                    <p>{user.email}</p>
                                    
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

        </>
    );
}
