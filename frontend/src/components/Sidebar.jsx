import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 fixed">
      <h2 className="text-2xl font-bold mb-6">SportTalk</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/questions" className="block hover:bg-gray-700 p-2 rounded">
            Questions
          </Link>
        </li>
        <li>
          <Link to="/answers" className="block hover:bg-gray-700 p-2 rounded">
            Answers
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;