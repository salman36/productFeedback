// src/FeedbackList.js
import React from 'react';
import './FeedbackList.css';

function FeedbackList({ feedbacks }) {
  return (
    <div className="feedback-list">
      <h2>Feedback List</h2>
      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback.id}>
            <div className={`message-container ${feedback.category.toLowerCase()}`}>
              <div className={`message ${feedback.category.toLowerCase()}-message ${feedback.user ? 'user-message' : ''}`}>
                <h3>{feedback.title}</h3>
                <p>{feedback.description}</p>
                <p>Category: {feedback.category}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackList;
