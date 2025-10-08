import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="post">
      <h1 className="post-title">Welcome to the React Blog</h1>
      <p className="post-description">Blog developed with MERN Stack (MongoDB, Express, React and NodeJS)</p>
      <Link to="/posts" className="button">Go to posts</Link>
    </div>
  )
}
