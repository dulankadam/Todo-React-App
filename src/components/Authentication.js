import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContextService';

const Authentication = () => {
  const { authenticate, currentUser, authLoading, logout } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [isRegisterMode, setIsRegisterMode] = useState(true);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = isRegisterMode ? 'register' : 'login';
    authenticate(action, form)
      .then((message) => alert(message))
      .catch((error) => alert(error));
  };

  return currentUser ? (
    <div className="flex flex-col items-center mt-8 space-y-4">
      <h2 className="text-xl font-semibold">Welcome, {currentUser.name}!</h2>
      <button onClick={logout} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
        Log Out
      </button>
    </div>
  ) : (
    <form className="max-w-sm mx-auto p-4 bg-white shadow-lg rounded-lg mt-8" onSubmit={handleSubmit}>
      {isRegisterMode && (
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.name}
          onChange={handleFormChange}
          required
        />
      )}
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.email}
        onChange={handleFormChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.password}
        onChange={handleFormChange}
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
        {authLoading ? 'Processing...' : isRegisterMode ? 'Register' : 'Login'}
      </button>
      <p onClick={() => setIsRegisterMode(!isRegisterMode)} className="text-center text-gray-600 mt-4 cursor-pointer">
        {isRegisterMode ? 'Already have an account? Login' : 'Don’t have an account? Register'}
      </p>
    </form>
  );
};

export default Authentication;
