// src/pages/ForgotDetails.js
import React, { useState } from 'react';
import './ForgotDetails.css';

function ForgotDetails() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/forgotDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber, dateOfBirth }),
      });
      const data = await res.json();
      if (res.ok) {
        setUserId(data.userId);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="forgot-details-container">
      <h1>Forgot Details</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder="Mobile Number"
          required
        />
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          placeholder="Date of Birth"
          required
        />
        <button type="submit">Retrieve Details</button>
        {userId && <p>Your User ID: {userId}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default ForgotDetails;
