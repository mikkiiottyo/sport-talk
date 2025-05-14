import React from 'react';
import SidebarCategory from './SidebarCategory';

const categories = [
  {
    id: 'fantasy',
    title: 'Fantasy Talk',
    items: [
      { id: 'fantasy-hurt',   label: "Who's Hurt" },
      { id: 'fantasy-sleepers',label: "Sleepers" },
      { id: 'fantasy-whotoplay', label: "Who-to-Play" },
    ],
  },
  {
    id: 'bets',
    title: 'Bets Talk',
    items: [
      { id: 'bets-nfl',    label: "NFL Picks" },
      { id: 'bets-parlays',label: "Parlays & Odds" },
    ],
  },
  {
    id: 'goat',
    title: 'Goat talk',
    items: [
      { id: 'best-nfl', label:"Best NFL PLayer"},
      { id: 'best-nba', label:"Best NBA PLayer"},
      { id: 'best-mlb', label:"Best MLB PLayer"},
    ],
  },
  {
    id: 'gear',
    title: 'Gear Talk',
    items: [
      { id: 'gear-cleats',   label: "Cleats" },
      { id: 'gear-jerseys',  label: "Jerseys" },
      { id: 'gear-accessories', label: "Accessories" },
    ],
  },
];

const Sidebar = ({ onTopicSelect }) => (
  <div className="bg-gray-700 w-64 text-white h-full p-4 overflow-y-auto">
    <h2 className="text-2xl font-bold mb-6">Topics</h2>
    {categories.map(cat => (
      <SidebarCategory
        key={cat.id}
        title={cat.title}
        items={cat.items}
        onItemClick={onTopicSelect}
      />
    ))}
  </div>
);

export default Sidebar;