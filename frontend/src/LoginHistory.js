// LoginHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LoginHistory({ userId }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await axios.get(`http://localhost:5000/login-history?userId=${userId}`);
      setHistory(response.data);
    };
    fetchHistory();
  }, [userId]);

  return (
    <div>
      <h1>Login History</h1>
      <ul>
        {history.map((login) => (
          <li key={login._id}>
            {new Date(login.loginTime).toLocaleString()} - IP: {login.ip} - Browser: {login.browser} - OS: {login.os} - Device: {login.device}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LoginHistory;
