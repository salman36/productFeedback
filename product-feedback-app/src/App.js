// App.js

import React, { useState, useEffect } from 'react';
import FeedbackForm from './FeedbackForm/FeedbackForm';
import FeedbackList from './FeedbackList/FeedbackList';
import LoginForm from './Authentication/LoginForm';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
      fetchFeedbacks();
    }
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('http://localhost:5000/feedbacks');
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const addFeedback = async (newFeedback) => {
    try {
      const response = await fetch('http://localhost:5000/feedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFeedback),
      });
      const data = await response.json();
      setFeedbacks([...feedbacks, data]);
    } catch (error) {
      console.error('Error adding feedback:', error);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      // Simulate login logic
      if (username === 'admin' && password === 'admin123') {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('username', username);
        
        // Fetch feedbacks after successful login
        await fetchFeedbacks();
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <h1>Product Feedback Tool</h1>
          <button className="logoutButton" onClick={handleLogout}>Logout</button>
          <FeedbackForm addFeedback={addFeedback} />
          <FeedbackList feedbacks={feedbacks} />
        </div>
      ) : (
        <div>
          <LoginForm onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
}

export default App;
