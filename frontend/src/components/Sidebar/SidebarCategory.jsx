import React, { useState } from 'react';

const SidebarCategory = ({ title, items = [], onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(open => !open)}
        className="w-full text-left font-semibold px-4 py-2 hover:bg-gray-700 rounded text-white cursor-pointer"
      >
        {title}
      </button>

      {isOpen && (
        <ul className="ml-4 mt-2 space-y-1">
          {items.map(item => (
            <li key={item.id}>
              <button
                onClick={() => onItemClick(item)}
                className="w-full text-left text-sm px-2 py-1 hover:underline hover:text-gray-300 cursor-pointer"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SidebarCategory;