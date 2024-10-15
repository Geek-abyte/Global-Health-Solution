import React, { useEffect } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  useEffect(() => {
    console.log("Contact component rendered");
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Contact Us</h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-6">
                We're here to help and answer any question you might have. We look forward to hearing from you.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <FaPhone className="text-primary-6 mr-4" />
                  <span className="text-gray-700">+447475136452</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-primary-6 mr-4" />
                  <span className="text-gray-700">contact@sozo-hal.com</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-primary-6 mr-4" />
                  <span className="text-gray-700">123 Health Street, London, UK</span>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 bg-primary-6 p-6 text-white">
              <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
              <form>
                <div className="mb-4">
                  <label className="block mb-2" htmlFor="name">Name</label>
                  <input type="text" id="name" className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2" htmlFor="email">Email</label>
                  <input type="email" id="email" className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2" htmlFor="message">Message</label>
                  <textarea id="message" rows="4" className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"></textarea>
                </div>
                <button type="submit" className="bg-white text-primary-6 font-bold py-2 px-4 rounded hover:bg-gray-100 transition duration-300">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
