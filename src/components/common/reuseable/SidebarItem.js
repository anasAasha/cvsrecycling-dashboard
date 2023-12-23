import React from 'react';
import { Link } from 'react-router-dom';

function SidebarItem({ to, icon, text }) {
  return (
    <li className="nav-item">
      <Link to={to} className="nav-link collapsed">
        {icon}
        <span className='ps-2'>{text}</span>
      </Link>
    </li>
  );
}

export default SidebarItem;
