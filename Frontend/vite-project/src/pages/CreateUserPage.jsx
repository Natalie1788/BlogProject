import { useState } from 'react';
 import {Link} from "react-router-dom"
 import { useNavigate } from 'react-router-dom';



function CreateUserPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
      e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            if(response.ok) {
                const data = await response.json();
                console.log("response ok", data);
                alert(`User ${email} created`);
                navigate('/account'); 
            } else {
                throw new Error('Something went wrong!');
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
              console.error('Response Text:', await error.response.text());
          }
        }
  
    }

  return (
    <div>
      <h1>Registrera dig</h1>
      <form className='register-form'>
        <label htmlFor="email">
          Email:
          <input 
            type="text" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </label>
        <label htmlFor="password">
          Lösenord:
          <input 
            type="password" 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </label>
        <button className='signup-btn' onClick={handleSignUp}>
           Skapa användare
            </button>
      </form>
      <Link to="/signin"><p style={{textAlign: "center"}}>Har du ett konto? Logga in</p></Link>
      
    </div>
  );
}

export default CreateUserPage;