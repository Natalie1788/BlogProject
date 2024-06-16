import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function CreatePostPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate()

    const handleCreatePost = async () => {
       
        try {
            const token = localStorage.getItem('token');
            const userId = getUserIdFromToken(token); // Функция для получения userId из токена
            const response = await fetch(`http://localhost:3000/api/users/${userId}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log("response ok", data);
                alert("Post successfully created");
                navigate("/account");
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

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


return(
    <div>
            <h1>Create New Post</h1>
            <form className='post-container' onSubmit={(e) => { e.preventDefault(); handleCreatePost(); }}>
                <label htmlFor="title">Post Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="content">Post Content:</label>
                <textarea className='create-textarea'
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">Create Post</button>
            </form>
            <div className='back-btn'>
            <button><Link style={{color: "yellow", textDecoration: "none"}} to="/account">Back to my account</Link></button>
            </div>
        </div>
)

    }