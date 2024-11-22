import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
  
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSuccessMessage(data.message || 'Registration successful!');
        setFormData({ username: '', email: '', password: '' });
      } else {
        setErrorMessage(data.error || 'Registration failed!');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('An error occurred during registration. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <label>Username: <input type="text" name="username" value={formData.username} onChange={handleChange} /></label><br />
        <label>Email: <input type="email" name="email" value={formData.email} onChange={handleChange} /></label><br />
        <label>Password: <input type="password" name="password" value={formData.password} onChange={handleChange} /></label><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;