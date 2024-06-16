import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function PostPage() {
    const { id } = useParams(); // we get id from route params
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [post, setPost] = useState(null);
    const navigate = useNavigate()

    const getPost = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setPost(data);
                setTitle(data.title);
                setContent(data.content);
            } else {
                throw new Error('Failed to fetch post');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPost();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleEdit = () => {
        setIsEditing(true); 
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, content })
            });

            if (!response.ok) throw new Error('Failed to update post');

            const updatedPost = await response.json();
            setPost(updatedPost);
            setIsEditing(false); 
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to delete post');

            navigate("/userposts")
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false); // switch off editing mode 
        setTitle(post.title); // origin title restored
        setContent(post.content); // origin content restored
    };

    return (
        <>
{isEditing ? (
                <form className='edit-post-form' onSubmit={handleUpdate}>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Content:</label>
                        <textarea className='edit-textarea'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    <button style={{marginTop: "20px"}} type="submit">Update Post</button>
                    <button type="button" onClick={handleCancelEdit}>Cancel</button>
                </form>
            ) : (
                <div>
                    <div className='get-post-container'>
            <p className='get-post-title'>{title}</p>
            <p className='get-post-content'>{content}</p>
        </div>
                   
                </div>
            )}
           <div className='back-btn'>
        <button><Link style={{color: "yellow", textDecoration: "none"}} to="/userposts">Back to posts</Link></button>
       <button onClick={handleEdit} style={{marginLeft: "10px"}}>Edit Post</button>
        <button onClick={handleDelete} style={{marginLeft: "10px"}}>Delete</button>
        </div>
        </>
    );
}
