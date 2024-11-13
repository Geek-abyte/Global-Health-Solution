import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog, updateBlog, fetchBlog, clearError, clearSuccess } from '../../../states/blog/blogSlice';
import { showToast } from "../../../states/popUpSlice";
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { FiSave, FiEye, FiUpload, FiX, FiPlus } from 'react-icons/fi';
import Button from "../../../components/Button";
import { LoadingSpinner, LoadingAnimation } from "../../../components";
import axiosInstance from "../../../utils/axiosConfig";

const formInput = "border-[3px] border-primary-5 text-primary-2 rounded-[20px] overflow-hidden p-2 w-full";

const BlogSchema = Yup.object().shape({
  title: Yup.string().required('* Title is required'),
  content: Yup.string().required('* Content is required'),
  author: Yup.string().required('* Author is required'),
  tags: Yup.array().of(Yup.string()),
  isPublished: Yup.boolean(),
});

const CreateEditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentBlog, loading, error, success } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const { VITE_TINYMCE_API_KEY } = import.meta.env;

  useEffect(() => {
    if (id) {
      setIsFetching(true);
      dispatch(fetchBlog(id))
        .finally(() => setIsFetching(false));
    }
    return () => {
      dispatch(clearError());
      dispatch(clearSuccess());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      dispatch(showToast({ status: "error", message: error }));
      setIsSubmitting(false);
    }
    if (success) {
      dispatch(showToast({ status: "success", message: id ? "Blog updated successfully" : "Blog created successfully" }));
      setIsSubmitting(false);
      navigate('/admin/blogs');
    }
  }, [success, error, dispatch, navigate, id]);

  const initialValues = {
    title: currentBlog?.title || '',
    content: currentBlog?.content || '',
    author: currentBlog?.author || `${user?.firstName} ${user?.lastName}` || '',
    tags: currentBlog?.tags || [],
    isPublished: currentBlog?.isPublished || false,
    featuredImage: null,
  };

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    setIsSubmitting(true);
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      if (key === 'tags') {
        values[key].forEach((tag, index) => formData.append(`tags[${index}]`, tag));
      } else if (key === 'featuredImage' && values[key]) {
        formData.append(key, values[key]);
      } else {
        formData.append(key, values[key]);
      }
    });

    const apiCall = id
      ? axiosInstance.put(`/blogs/${id}`, formData)
      : axiosInstance.post('/blogs', formData);

    apiCall
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          dispatch(showToast({
            status: "success",
            message: id ? "Blog updated successfully!" : "Blog created successfully!",
          }));
          setStatus({ success: true });
          navigate('/admin/blogs');
        } else {
          throw new Error("Unexpected response status");
        }
      })
      .catch((error) => {
        let errorMessage = id ? "Failed to update blog. Please try again." : "Failed to create blog. Please try again.";
        if (error.response) {
          errorMessage = error.response.data.message || errorMessage;
        }
        dispatch(showToast({ status: "error", message: errorMessage }));
        setStatus({ success: false });
      })
      .finally(() => {
        setSubmitting(false);
        setIsSubmitting(false);
      });
  };

  const handlePreview = (values) => {
    const previewContent = `
      <html>
        <head>
          <title>${values.title}</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body class="bg-gray-100">
          <div class="container mx-auto p-4">
            <h1 class="text-3xl font-bold mb-4">${values.title}</h1>
            ${values.featuredImage ? `<img src="${URL.createObjectURL(values.featuredImage)}" alt="Featured Image" class="w-full h-64 object-cover mb-4 rounded-lg">` : ''}
            <p class="text-gray-600 mb-2">By ${values.author}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              ${values.tags.map(tag => `<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded">${tag}</span>`).join('')}
            </div>
            <div class="prose max-w-none">${values.content}</div>
          </div>
        </body>
      </html>
    `;
    const blob = new Blob([previewContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    window.open(url, '_blank');
  };

  if (isFetching) return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <LoadingAnimation />
      <p className="text-xl font-semibold mt-4">Loading blog...</p>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{id ? 'Edit' : 'Create'} Blog</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={BlogSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <Field
                  type="text"
                  name="title"
                  id="title"
                  className={formInput}
                />
                <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <Field
                  type="text"
                  name="author"
                  id="author"
                  className={formInput}
                />
                <ErrorMessage name="author" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <FieldArray name="tags">
                {({ push, remove }) => (
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {values.tags.map((tag, index) => (
                        <div key={index} className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="ml-2 text-blue-500 hover:text-blue-700"
                          >
                            <FiX />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center">
                      <Field
                        name="newTag"
                        placeholder="Add a tag"
                        className={`${formInput} rounded-r-none`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (values.newTag && !values.tags.includes(values.newTag)) {
                            push(values.newTag);
                            setFieldValue('newTag', '');
                          }
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition duration-300"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>
            </div>

            <div>
              <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {values.featuredImage ? (
                    <img
                      src={URL.createObjectURL(values.featuredImage)}
                      alt="Preview"
                      className="mx-auto h-64 w-full object-cover rounded"
                    />
                  ) : (
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="featuredImage"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>{values.featuredImage ? 'Change image' : 'Upload an image'}</span>
                      <input
                        id="featuredImage"
                        name="featuredImage"
                        type="file"
                        className="sr-only"
                        onChange={(event) => {
                          setFieldValue("featuredImage", event.currentTarget.files[0]);
                        }}
                        accept="image/*"
                      />
                    </label>
                    {values.featuredImage && (
                      <p className="pl-1">or drag and drop</p>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <Editor
                apiKey={VITE_TINYMCE_API_KEY}
                value={values.content}
                onEditorChange={(content) => setFieldValue('content', content)}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar: 'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
                }}
              />
              <ErrorMessage name="content" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex items-center">
              <Field
                type="checkbox"
                id="isPublished"
                name="isPublished"
                className="mr-2"
              />
              <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">Publish</label>
            </div>

            <div className="flex justify-between">
              <Button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-[45%] bg-blue-500 hover:bg-blue-600"
              >
                {isSubmitting || loading ? <LoadingSpinner /> : (
                  <>
                    <FiSave className="mr-2" />
                    {id ? 'Update' : 'Create'} Blog
                  </>
                )}
              </Button>
              <Button
                type="button"
                onClick={() => handlePreview(values)}
                className="w-[45%] bg-green-500 hover:bg-green-600"
              >
                <FiEye className="mr-2" />
                Preview
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateEditBlog;