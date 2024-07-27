import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Article = ({ blogs }) => {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === parseInt(id));

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Blog not found</strong>
          <span className="block sm:inline">The blog you are looking for does not exist.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <img className="w-full h-96 object-cover rounded-lg" src={blog.image} alt={blog.title} />
      </div>
      <div className="bg-gray-100 p-8 rounded-lg">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{blog.title}</h1>
        <p className="text-gray-600 mb-6">{blog.date}</p>
        <div className="text-gray-700 leading-relaxed mb-8">{blog.content}</div>
        <div className="text-right">
          <Link
            to="/"
            className="inline-block bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Article;