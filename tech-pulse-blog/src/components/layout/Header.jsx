import React, { useState } from 'react';
import logo from "../../images/logo_icon.png";
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={logo} alt="TechPulse blog" />
        <span>TechPulse</span>
      </Link>

      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
        &#9776;
      </button>

      {menuOpen && <div className="menu-backdrop" onClick={toggleMenu}></div>}

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <ul>
          <li><NavLink to="/home" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/posts" onClick={() => setMenuOpen(false)}>Posts</NavLink></li>
          <li><NavLink to="/new-post" onClick={() => setMenuOpen(false)}>New Post</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}
