import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/questions">Questions</Link></li>
                <li><Link to="/answers">Answers</Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;