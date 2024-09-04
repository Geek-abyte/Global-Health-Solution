import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiEye, FiMonitor } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, deleteBlog } from '../../../states/blog/blogSlice';
import BlogPreview from './BlogPreview';
import { PATH } from '../../../routes/path';

const AdminBlogs = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blog);
  const [filter, setFilter] = useState('all');
  const [previewBlog, setPreviewBlog] = useState(null);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      dispatch(deleteBlog(id));
    }
  };

  const handlePreview = (blog) => {
    setPreviewBlog(blog);
  };

  const filteredBlogs = blogs.filter(blog => {
    if (filter === 'all') return true;
    if (filter === 'published') return blog.isPublished;
    if (filter === 'draft') return !blog.isPublished;
    return true;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Manage Blogs</h1>
        <Link to={PATH.admin.createBlog} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Blog
        </Link>
      </div>
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBlogs.map((blog) => (
          <div key={blog._id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p>{blog.content.substring(0, 100)}...</p>
            <p>Status: {blog.isPublished ? 'Published' : 'Draft'}</p>
            <div className="mt-2 flex justify-between">
              <Link to={`${PATH.admin.editBlog}/${blog._id}`} className="text-blue-500 hover:text-blue-700">
                <FiEdit />
              </Link>
              <button onClick={() => handleDelete(blog._id)} className="text-red-500 hover:text-red-700">
                <FiTrash2 />
              </button>
              <Link to={`${PATH.admin.previewBlog}/${blog._id}`} className="text-green-500 hover:text-green-700">
                <FiEye />
              </Link>
              <button onClick={() => handlePreview(blog)} className="text-purple-500 hover:text-purple-700">
                <FiMonitor />
              </button>
            </div>
          </div>
        ))}
      </div>
      {previewBlog && (
        <BlogPreview blog={previewBlog} onClose={() => setPreviewBlog(null)} />
      )}
    </div>
  );
};

export default AdminBlogs;
