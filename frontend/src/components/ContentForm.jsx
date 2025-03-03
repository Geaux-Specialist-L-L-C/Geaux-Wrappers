import React, { useState } from 'react';
import { generateContent, saveContent } from '../services/api';
import { ClipLoader } from 'react-spinners';

const ContentForm = ({ onContentGenerated }) => {
  const [formData, setFormData] = useState({
    niche: '',
    contentType: 'blog',
    keywords: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const keywordsList = formData.keywords.split(',').map(k => k.trim());
      
      if (!formData.niche) {
        throw new Error('Please enter a niche/topic');
      }
      
      if (!keywordsList.length || keywordsList[0] === '') {
        throw new Error('Please enter at least one keyword');
      }
      
      const result = await generateContent(
        formData.niche,
        formData.contentType,
        keywordsList
      );
      
      onContentGenerated({
        content: result.content,
        metadata: {
          niche: formData.niche,
          contentType: formData.contentType,
          keywords: keywordsList,
        }
      });
    } catch (err) {
      setError(err.message || 'Failed to generate content. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Generate Content</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Content Type</label>
          <select
            name="contentType"
            value={formData.contentType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="blog">Blog Post</option>
            <option value="script">YouTube Script</option>
            <option value="summary">Podcast Summary</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Niche/Topic</label>
          <input
            type="text"
            name="niche"
            value={formData.niche}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="E.g. Digital Marketing, Technology, Fitness"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            Keywords (comma-separated)
          </label>
          <input
            type="text"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="E.g. SEO, social media, analytics"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <ClipLoader size={20} color="#ffffff" />
              <span className="ml-2">Generating...</span>
            </div>
          ) : (
            'Generate Content'
          )}
        </button>
      </form>
    </div>
  );
};

export default ContentForm;