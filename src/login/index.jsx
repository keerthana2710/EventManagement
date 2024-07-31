import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { IonIcon } from '@ionic/react';
import { mailOutline, lockClosedOutline } from 'ionicons/icons';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      alert('Login successful! Token: ' + data.jwtToken);
      localStorage.setItem('jwtToken', data.jwtToken);
      navigate('/');
    } else {
      const errorMessage = await response.text();
      setErrorMessage(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="inputbox">
          <IonIcon icon={mailOutline} />
          <label htmlFor="username">UserName</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="inputbox">
          <IonIcon icon={lockClosedOutline} />
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
        <div className="register">
          <p>Don't have an account? Please register here <a href="/register">Register</a></p>
        </div>
        {errorMessage && <p id="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
