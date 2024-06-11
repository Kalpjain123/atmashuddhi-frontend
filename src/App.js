// src/App.js
import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);

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
      setResponses((prevResponses) => [...prevResponses, { question: message, answer: data[0]?.answer || 'No answer available' }]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="App">
      <h1>Welcome to Atmashuddhi Creation</h1>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your question..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        {responses.map((response, index) => (
          <div key={index}>
            <strong>Q:</strong> {response.question} <br />
            <strong>A:</strong> {response.answer}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
