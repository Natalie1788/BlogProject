/*import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function UserPostsPage() {
    const { userId } = useParams(); // Получаем userId из параметров маршрута
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUserPosts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/users/${userId}/posts`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) { 
                const data = await response.json();
                setPosts(data);
            } else {
                throw new Error('Failed to fetch posts');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserPosts();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    


    return (
        <div>
            <h1>User Posts</h1>
            {posts.length === 0 ? (
                <p>No posts found</p>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="post">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </div>
                ))
            )}
             <button><Link to="/account">Back to my account</Link></button>
        </div>
    );
}*/
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

// Функция для извлечения userId из токена
const getUserIdFromToken = (token) => {
    if (!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const { id } = JSON.parse(jsonPayload);
    return id;
};

export default function UserPostsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   

    const fetchUserPosts = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = getUserIdFromToken(token);

            if (!userId) {
                throw new Error('Invalid token');
            }

            const response = await fetch(`http://localhost:3000/api/users/${userId}/posts`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            } else {
                throw new Error('Failed to fetch posts');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserPosts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>My Posts</h1>
           <div className='posts-container'>
            {posts.length === 0 ? (
                <p>No posts found</p>
            ) : (
                posts.map((post) => (
                    <Link key={post.id} style={{textDecoration: "none", color: "white"}} to={`/posts/${post.id}`}>
                        <div className='post' key={post.id}>
                            <h2 className='post-title'>{post.title}</h2>
                            <p className='post-content'>{post.content}</p>
                        </div>
                    </Link>
                ))
            )}
            </div>
            <div className='back-btn'>
                <button><Link style={{color: "yellow", textDecoration: "none"}} to="/account">Back to my account</Link></button>
            </div>
        </div>
    );
}

