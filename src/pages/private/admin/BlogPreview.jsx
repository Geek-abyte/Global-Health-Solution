import React from 'react';
import { FiX } from 'react-icons/fi';

const BlogPreview = ({ blog, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl h-full max-h-[90vh] overflow-auto rounded-lg shadow-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX size={24} />
        </button>
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-500 mb-4">{new Date(blog.createdAt).toLocaleDateString()}</p>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
    </div>
  );
};

export default BlogPreview;