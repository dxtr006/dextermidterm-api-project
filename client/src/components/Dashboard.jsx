import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; 

function Dashboard() {
  const navigate = useNavigate(); // Hook for navigation

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    alert('You have successfully logged out.'); 

    // Redirect to the home page
    navigate('/');
  };

  return (
    <div className="dashboard">
      <h1>Welcome to Circuit-Surge</h1>
      <p>You are successfully logged in!</p>
      <p>Here’s where you can manage your components and account settings.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;