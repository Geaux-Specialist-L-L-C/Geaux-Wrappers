import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import ContentForm from '../components/ContentForm';
import ContentDisplay from '../components/ContentDisplay';
import AuthContext from '../context/AuthContext';

const Home = () => {
  const { user, loading } = useContext(AuthContext);
  const [generatedContent, setGeneratedContent] = useState(null);
  
  // Redirect to login if not authenticated
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  const handleContentGenerated = (content) => {
    setGeneratedContent(content);
  };
  