import React, { useState } from 'react';

const PasswordProtect = ({ children }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    const adminPassword = 'SoulaimanMeskini'; 
    if (password === adminPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl mb-4">Enter Admin Password</h1>
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        className="p-2 border rounded"
        placeholder="Password"
      />
      <button
        onClick={handleLogin}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Login
      </button>
    </div>
  );
};

export default PasswordProtect;
