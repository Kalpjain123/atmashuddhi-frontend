// src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);
  const [token, setToken] = useState(null);

  const sendMessage = async () => {
    if (message.trim() === '') return;
    try {
      const res = await fetch('https://atmashuddhi-backend.onrender.com/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setResponses(data);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const createTicket = async () => {
    if (message.trim() === '') return;
    try {
      const res = await fetch('https://atmashuddhi-backend.onrender.com/api/chatbot/ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: message }),
      });
      const data = await res.json();
      setToken(data.token);
      setMessage('');
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <div className="App">
      <h1>Welcome to Atmashuddhi Creation</h1>
      <div className="chat-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your question..."
        />
        <button onClick={sendMessage}>Search</button>
        <button onClick={createTicket}>Ask Different Question</button>
      </div>
      <div className="responses-container">
        {responses.length > 0 && (
          <div>
            <h2>Related Questions:</h2>
            {responses.map((response, index) => (
              <div key={index} className="response-item">
                <strong>Q:</strong> {response.question} <br />
                <strong>A:</strong> {response.answer}
              </div>
            ))}
          </div>
        )}
        {token && (
          <div className="token-container">
            <h2>New Question Token:</h2>
            <p>Token: {token}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
              
