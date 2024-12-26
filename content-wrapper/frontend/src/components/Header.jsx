
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-blue-600 text-white p-4">
    <h1 className="text-xl font-bold">Content Automation</h1>
    <nav>
      <Link to="/" className="mr-4">Home</Link>
      <Link to="/generated-content" className="mr-4">Generated Content</Link>
    </nav>
  </header>
);

export default Header;
