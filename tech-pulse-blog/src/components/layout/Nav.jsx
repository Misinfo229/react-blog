import React from 'react';
import { NavLink } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li><NavLink to="/home">Home</NavLink></li>
        <li><NavLink to="/posts">Posts</NavLink></li>
        <li><NavLink to="/new-post">New post</NavLink></li>
      </ul>
    </nav>
  )
}
