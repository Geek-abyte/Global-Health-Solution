import React, { useState } from 'react';
import { specialists } from '../../data/specialists';

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSpecialist, setExpandedSpecialist] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
  };

  const handleSpecialistClick = (specialist) => {
    setExpandedSpecialist(specialist === expandedSpecialist ? null : specialist);
  };

  const filteredSpecialists = specialists.filter(
    (specialist) =>
      specialist.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === '' || specialist.category === categoryFilter)
  );

  const categories = [
    ...new Set(specialists.map((specialist) => specialist.category)),
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">Our Doctors</h1>
          <input
            type="text"
            placeholder="Search specialists..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div className="flex justify-start space-x-4 mb-8 max-w-7xl flex-wrap gap-y-5">
          <button
            onClick={() => handleCategoryFilter('')}
            className={`px-4 py-2 rounded-md ${
              categoryFilter === '' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`px-4 py-2 rounded-md ${
                categoryFilter === category ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpecialists.map((specialist) => (
            <div
              key={specialist.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                expandedSpecialist === specialist ? 'ring-2 ring-indigo-600' : ''
              }`}
            >
              <img
                src={specialist.image}
                alt={specialist.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {specialist.name}
                </h2>
                <p className="text-gray-600">{specialist.category}</p>
                <button
                  onClick={() => handleSpecialistClick(specialist)}
                  className="mt-2 text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        {expandedSpecialist && (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-48 w-48 rounded-full overflow-hidden">
                    <img
                      src={expandedSpecialist.image}
                      alt={expandedSpecialist.name}
                      className="h-48 w-48 object-cover"
                    />
                  </div>
                  <div className="mt-4 text-center sm:mt-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {expandedSpecialist.name}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm text-gray-500">
                      {expandedSpecialist.qualifications}
                    </p>
                    <p className="mt-4 text-sm text-gray-700">
                      {expandedSpecialist.bio}
                    </p>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => handleSpecialistClick(expandedSpecialist)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;