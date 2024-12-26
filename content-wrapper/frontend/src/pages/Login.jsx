
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { loginUser } from '../services/auth';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser(formData);
    if (token) {
      login(token);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-lg rounded">
      <label className="block mb-2">
        Email:
        <input type="email" name="email" onChange={handleChange} required className="w-full border p-2" />
      </label>
      <label className="block mb-4">
        Password:
        <input type="password" name="password" onChange={handleChange} required className="w-full border p-2" />
      </label>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
};

export default Login;
