// src/App.js
import React, { useState } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [message, setMessage] = useState('');

  const fetchBackendData = async () => {
    try {
      const res = await fetch('https://atmashuddhi-backend.onrender.com');
      const data = await res.text();
      setResponse(data);
    } catch (error) {
      console.error('Error fetching backend data:', error);
    }
  };

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
      setResponse(data);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="App">
      <h1>Welcome to Atmashuddhi Creation</h1>
      <button onClick={fetchBackendData}>Fetch Backend Data</button>
      {response && <p>Response from backend: {JSON.stringify(response)}</p>}
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your question..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;

