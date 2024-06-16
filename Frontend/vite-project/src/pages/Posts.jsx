import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Modal from '../components/Modal';

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getAllPosts = async () => {
        try {
            
            const response = await fetch("http://localhost:3000/api/posts", {
                headers: {
                    'Content-Type': 'application/json',
                    
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
        getAllPosts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const openModal = (post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPost(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <h1>All Posts</h1>
            <div className='all-posts-container'>
                {posts.length === 0 ? (
                    <p>No posts found</p>
                ) : (
                    <ul style={{  display: "flex", flexWrap: "wrap", gap: "20px" }}>
                    {posts.map((post) => (
                         <li className='post' key={post.id} onClick={() => openModal(post)}>
                            <p className='post-title'>{post.title}</p>
                            <p className='post-content'>{post.content}</p>
                            
                        </li>
                    ))}
                </ul>
            )}
        </div>

        <div className='back-btn'>
        <button><Link style={{color: "yellow", textDecoration: "none"}} to="/">Back</Link></button>
        </div>

        {isModalOpen && selectedPost && (
                <Modal post={selectedPost} onClose={closeModal} />
            )}
    </>
);
}