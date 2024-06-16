
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    alert(`Welcome back, ${email}`);
                    navigate('/account'); 
                } else {
                    throw new Error('Token is missing in the response');
                }
            } else {
                throw new Error('Incorrect username or password');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <div>
            <h1>Logga in</h1>
            <form className='login-form'>
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
                <button type="button" className='signin-btn' onClick={handleSignIn}>
                    Logga in
                </button>
            </form>
            <Link to="/signup"><p style={{textAlign: "center"}}>Har du inget konto? Registrera dig</p></Link>
        </div>
    );
}

export default SignInPage;
