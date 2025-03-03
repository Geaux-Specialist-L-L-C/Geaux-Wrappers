import React, { useState } from 'react';
import { saveContent } from '../services/api';
import { ClipLoader } from 'react-spinners';

const ContentDisplay = ({ content, metadata }) => {
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  
  const handleSave = async () => {
    if (!title) {
      setError('Please enter a title');
      return;
    }
    
    setSaving(true);
    setError('');
    
    try {
      await saveContent(
        title,
        metadata.contentType,
        metadata.keywords,
        content
      );
      setSaved(true);
    } catch (err) {
      setError('Failed to save content. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Generated Content</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {saved && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Content saved successfully!
        </div>
      )}
      
      <div className="mb-6">
        <div className="flex mb-2">
          <span className="font-semibold mr-2">Type:</span>
          <span className="capitalize">{metadata.contentType}</span>
        </div>
        <div className="flex mb-2">
          <span className="font-semibold mr-2">Niche:</span>
          <span>{metadata.niche}</span>
        </div>
        <div className="flex mb-4">
          <span className="font-semibold mr-2">Keywords:</span>
          <span>{metadata.keywords.join(', ')}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter a title to save this content"
        />
      </div>
      
      <div className="mb-6 p-4 bg-gray-50 rounded border">
        <div className="whitespace-pre-line">{content}</div>
      </div>
      
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          disabled={saving || saved}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-200 flex items-center"
        >
          {saving ? (
            <>
              <ClipLoader size={20} color="#ffffff" />
              <span className="ml-2">Saving...</span>
            </>
          ) : saved ? (
            'Saved'
          ) : (
            'Save Content'
          )}
        </button>
        
        <button
          onClick={handleCopy}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
        >
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};

export default ContentDisplay;