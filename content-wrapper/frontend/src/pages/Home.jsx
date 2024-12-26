
import React, { useState } from 'react';
import ContentForm from '../components/ContentForm';
import ContentDisplay from '../components/ContentDisplay';

const Home = () => {
  const [generatedContent, setGeneratedContent] = useState('');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Automate Your Content Creation</h1>
      <ContentForm setGeneratedContent={setGeneratedContent} />
      <ContentDisplay content={generatedContent} />
    </div>
  );
};

export default Home;
