// src/components/BlogCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog, fixedHeight }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-500 hover:scale-105 ${
        fixedHeight ? 'h-full' : ''
      }`}
      style={{
        animationDelay: `${Math.random() * 0.5}s`,
      }}
    >
      <Link to={`/blog/${blog.id}`}>
        <img
          className={`w-full ${
            fixedHeight ? 'h-48' : 'h-auto'
          } object-cover`}
          src={blog.image}
          alt={blog.title}
        />
      </Link>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-green-500 text-white font-bold rounded-full py-1 px-3 mr-2 animate-pulse">
            NEW
          </div>
          <p className="text-gray-600">{blog.date}</p>
        </div>
        <Link to={`/blog/${blog.id}`}>
          <h2 className="text-2xl font-bold mb-4 hover:text-indigo-500 transition-colors duration-300">
            {blog.title}
          </h2>
        </Link>
        <p className="text-gray-700 leading-relaxed line-clamp-3">
          {blog.content}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;