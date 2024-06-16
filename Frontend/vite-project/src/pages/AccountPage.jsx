import React, { useEffect, useState } from 'react';
import avatar from "../../public/avatar.png"
import { Link } from 'react-router-dom';


function AccountPage() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
       
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            console.log('Saved token:', token);
            const response = await fetch('http://localhost:3000/api/account', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                setPosts(data.posts);
            } else {
                console.error('Failed to fetch account data');
            }
        };

        fetchData();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    const handleLogOut = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch('http://localhost:3000/api/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
          });
      
          if (response.ok) {
            const data = await response.json();
            localStorage.removeItem('token');
            console.log('Logout successful:', data);
            alert(`Bye, ${email}`);
            navigate('/');
   
          } else {
            throw new Error('Logout failed');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      

    return (
        <div className='account-info-container'>
           <img style={{width: "10%"}} src={avatar} alt='avatar'/>
            <h1 className='welcome-text'>Welcome, {user.email}</h1>
           
            <button><Link style={{color: "yellow", textDecoration: "none"}} to="/userposts">Your Posts</Link></button>
           
            <button><Link style={{color: "yellow", textDecoration: "none"}} to="/createpost">Create a post</Link></button>
           <button onClick={handleLogOut}>Log out</button>
        </div>
    );
}

export default AccountPage;