import React, { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
    gender: '',
    location: ''
  });
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, name, password, gender, location } = formData;

    try {
      const response = await fetch('/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, name, password, gender, location })
      });

      if (response.ok) {
        const data = await response.text();
        setResponseMessage(`Success: ${data}`);
        navigate('/login');
      } else {
        const errorText = await response.text();
        setResponseMessage(`${errorText} please try different name`);
      }
    } catch (error) {
      setResponseMessage(error.message);
    }
  };

  return (
    <div className="background">
      <form id="registerForm" onSubmit={handleSubmit}>
        <h1>User Registration</h1>
        <div className="inputbox">
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="inputbox">
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="inputbox">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div>
          <label htmlFor="gender">Gender:</label>
          <div className="radiobutton">
            <div>
              <input 
                type="radio" 
                id="male" 
                name="gender" 
                value="Male" 
                checked={formData.gender === 'Male'} 
                onChange={handleChange} 
                required 
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input 
                type="radio" 
                id="female" 
                name="gender" 
                value="Female" 
                checked={formData.gender === 'Female'} 
                onChange={handleChange} 
                required 
              />
              <label htmlFor="female">Female</label>
            </div>
            <div>
              <input 
                type="radio" 
                id="other" 
                name="gender" 
                value="Other" 
                checked={formData.gender === 'Other'} 
                onChange={handleChange} 
                required 
              />
              <label htmlFor="other">Other</label>
            </div>
          </div>
        </div>
        
        <div className="inputbox">
          <label htmlFor="location">Location:</label>
          <input 
            type="text" 
            id="location" 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div id="response">{responseMessage}</div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
